import React from 'react';
import { useRouter } from 'next/router';
import * as AT from '../../actionType';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector(state => state.post);

  return (
    <AppLayout>
      <PostCard post={singlePost} />
      <div>{`${id}가 쓴 글`}</div>
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
  context.store.dispatch({ type: AT.LOAD_POST_REQUEST, data: context.params.id });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default Post;
