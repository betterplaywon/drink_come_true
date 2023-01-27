import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';

import * as AT from '../actionType';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { mainPosts, isMorePosts, loadPostLoading } = useSelector(state => state.post);

  return (
    <AppLayout>
      <Head>
        <title> DRINK COME TRUE</title>
      </Head>
      <div>메인 페이지</div>
      <div>메인페이지 내용 2</div>
      <div>메인페이지 내용 3</div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  // context 안에 store가 들어있다.
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: AT.LOAD_POSTS_REQUEST });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
