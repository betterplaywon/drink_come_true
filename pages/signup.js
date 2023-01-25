import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { AppleOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import * as AT from '../actionType';
import Router from 'next/router';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSession } from 'next-auth/react';

/**
 * @deprecated
 * 2023.01.25
 * userSign 페이지 생성으로 인한 컴포넌트 사용 중지
 */

const SignUp = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError, user } = useSelector(state => state.user);
  const [email, handleChangeEmail] = useInput('');
  const [nickname, handleChangeNickname] = useInput('');
  const [password, handleChangePassword] = useInput('');
  const { data } = useSession();

  // useEffect(() => {
  //   if ((user && user.id) || data || signupDone) {
  //     alert('이미 가입하셨습니다');
  //     Router.replace('/');
  //   }
  // }, [user && user.id, signupDone]);

  // useEffect(() => {
  //   if (signupDone) {
  //     Router.replace('/');
  //   }
  // }, [signupDone]);

  // useEffect(() => {
  //   if (signupError) {
  //     alert(signupError);
  //   }
  // }, [signupError]);

  // const onSubmit = useCallback(() => {
  //   console.log(email, nickname, password);
  //   dispatch({ type: SIGN_UP_REQUEST, data: { email, nickname, password } });
  // }, [email, nickname, password]);

  // return (
  //   <div className={`${style.formContainer} ${style.signUpContainer}`}>
  //     <form onSubmit={handleSignUpForm}>
  //       <h1>Create Account</h1>
  //       <div className={style.socialContainer}>
  //         <GoogleOutlined />
  //       </div>

  //       <span>or use your email for registration</span>

  //       <br />
  //       <input name="user-email" type="email" value={email} onChange={handleChangeEmail} placeholder="email" />

  //       <input
  //         name="user-nickname"
  //         type="text"
  //         value={nickname}
  //         onChange={handleChangeNickname}
  //         placeholder="nickname"
  //       />

  //       <input
  //         name="user-password"
  //         value={password}
  //         onChange={handleChangePassword}
  //         maxLength={13}
  //         placeholder="password"
  //       />

  //       <div style={{ marginTop: '15px' }}>
  //         <button>가입하기</button>
  //       </div>
  //     </form>
  //   </div>
  // );
};

// export const getServerSideProps = wrapper.getServerSideProps(async context => {
//   // context 안에 store가 들어있다.
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
//   context.store.dispatch({ type: AT.LOAD_POSTS_REQUEST });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

export default SignUp;
