import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';

import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../actionType';
import GoogleLogInButton from '../components/GoogleLogInButton';
import GoogleLogOutButton from '../components/GoogleLogOutButton';
import { useSession } from 'next-auth/react';

import wrapper from '../store/configureStore';
import axios from 'axios';
import * as AT from '../actionType';
import { END } from 'redux-saga';

import style from '../styles/userSign.module.css';
import styled, { createGlobalStyle } from 'styled-components';

import { GoogleOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';

const drinktest = () => {
  return <div>음주 빈도 테스트</div>;
};

export default drinktest;
