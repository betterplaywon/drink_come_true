import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

import { useSelector } from 'react-redux';
import * as AT from '../actionType';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import DrinkChart from '../components/DrinkChart';
import { useSession } from 'next-auth/react';

const cycle = () => {
  const { user } = useSelector(state => state.user);
  const { data } = useSession();

  return (
    <>
      <Head>
        <title>Drink Come True - Drink Cycle</title>
      </Head>
      <AppLayout>{user || data ? <DrinkChart /> : <p>'로그인 후 이용 가능합니다'</p>}</AppLayout>
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
