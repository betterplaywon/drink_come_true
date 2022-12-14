import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../../components/PostCard';
import * as AT from '../../actionType';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import { useRouter } from 'next/router';

const Tag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, isMorePosts, loadPostsLoading } = useSelector(state => state.post);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        if (isMorePosts && !loadPostsLoading) {
          const endId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({ type: AT.LOAD_HASTAG_POSTS_REQUEST, data: tag, endId });
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isMorePosts, mainPosts.length, tag, loadPostsLoading]);

  return (
    <AppLayout>
      {mainPosts.map(m => (
        <PostCard key={m.id} post={m} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
  context.store.dispatch({
    type: AT.LOAD_HASTAG_POSTS_REQUEST,
    data: context.params.tag,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
export default Tag;
