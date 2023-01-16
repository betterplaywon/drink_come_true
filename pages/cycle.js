import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameForm from '../components/NicknameForm';
import { useSelector, useDispatch } from 'react-redux';
import * as AT from '../actionType';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import Router from 'next/router';
import useSWR from 'swr';
import DrinkChart from '../components/DrinkChart';

const cycle = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  return (
    <>
      <Head>
        <title>음주 주기 확인</title>
      </Head>
      <AppLayout>{user ? <DrinkChart /> : <p>'로그인 후 이용 가능합니다'</p>}</AppLayout>
    </>
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
  // context.store.dispatch({ type: AT.LOAD_POSTS_REQUEST });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default cycle;
