import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import * as AT from '../actionType';

const HomeComp = dynamic(() => import('../components/HomeComp'));

const Home = () => {
  return (
    <AppLayout>
      <Head>
        <title> DRINK COME TRUE</title>
      </Head>
      <HomeComp />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
  store.dispatch({ type: AT.LOAD_POSTS_REQUEST });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Home;
