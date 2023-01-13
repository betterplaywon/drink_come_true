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

  useEffect(() => {
    if (!(user && user.id)) {
      Router.push('/');
    }
  }),
    [user && user.id];

  return (
    <>
      <Head>
        <title>음주 주기 확인</title>
      </Head>
      <DrinkChart />
    </>
  );
};

export default cycle;
