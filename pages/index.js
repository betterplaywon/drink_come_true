import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';

import * as AT from '../actionType';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';

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

export default Home;
