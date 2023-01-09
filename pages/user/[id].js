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
import { Card, Avatar } from 'antd';

const User = () => {
  const dispatch = useDispatch();
  const { anotherUser, user } = useSelector(state => state.user);
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, isMorePosts, loadPostsLoading } = useSelector(state => state.post);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        if (isMorePosts && !loadPostsLoading) {
          const endId = mainPosts[mainPosts.length - 1]?.id;
          console.log(endId);
          dispatch({ type: AT.LOAD_USER_POSTS_REQUEST, data: id, endId: endId });
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isMorePosts, mainPosts.length, id, loadPostsLoading]);

  return (
    <AppLayout>
      {anotherUser && (
        <Head>
          <title>
            {anotherUser.nickname}
            님의 글
          </title>
          <meta name="description" content={`${anotherUser.nickname}님의 게시글`} />
          <meta property="og:title" content={`${anotherUser.nickname}님의 게시글`} />
          <meta property="og:description" content={`${anotherUser.nickname}님의 게시글`} />
          <meta property="og:image" content="" />
          <meta property="og:url" content={`https://drinkcometrue.com/user/${id}`} />
        </Head>
      )}
      {anotherUser && anotherUser.id !== user.id ? (
        <Card
          actions={[
            <div key="post">
              게시글
              <br />
              {anotherUser.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {anotherUser.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {anotherUser.Followers}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{anotherUser.nickname[0]}</Avatar>} title={anotherUser.nickname} />
        </Card>
      ) : null}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
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
    type: AT.LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch({
    type: AT.LOAD_ANOTHER_USER_INFO_REQUEST,
    data: context.params.id,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
export default User;
