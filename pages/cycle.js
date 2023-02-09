import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Router from 'next/router';

import { useSelector } from 'react-redux';
import * as AT from '../actionType';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const AppLayout = dynamic(() => import('../components/AppLayout'));
const DrinkChart = dynamic(() => import('../components/DrinkChart'));

const cycle = () => {
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (!user) {
      alert('로그인 후 이용해주세요');
      Router.push('/');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Drink Come True - Drink Cycle</title>
      </Head>
      <AppLayout>{user ? <DrinkChart /> : <p style={{ color: '#eee' }}>'로그인 후 이용 가능합니다'</p>}</AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default cycle;
