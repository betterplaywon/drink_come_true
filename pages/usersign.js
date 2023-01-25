import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';

import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../actionType';
import GoogleLogInButton from '../components/GoogleLogInButton';
import { useSession } from 'next-auth/react';

import wrapper from '../store/configureStore';
import axios from 'axios';
import * as AT from '../actionType';
import { END } from 'redux-saga';

import style from '../styles/userSign.module.css';
import styled, { createGlobalStyle } from 'styled-components';

import { GoogleOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';

const usersign = () => {
  const [email, handleChangeEmail] = useInput('');
  const [password, handleChangePassword] = useInput('');
  const [nickname, handleChangeNickname] = useInput('');
  const [transition, setTransition] = useState(false);
  const dispatch = useDispatch();
  const { logInLoading, logInError, signupLoading, signupDone, signupError, user } = useSelector(state => state.user);

  const { data } = useSession();
  const isClient = typeof document === 'object';

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (transition === false) {
      signUpButton.addEventListener('click', () => {
        container.classList.add(`${style.rightPanelActive}`);
        setTransition(true);
      });
    }
    if (transition === true) {
      signInButton.addEventListener('click', () => {
        container.classList.remove(`${style.rightPanelActive}`);
        setTransition(false);
      });
    }

    return () => {
      signUpButton.addEventListener('click', () => {
        console.log('클린업');
        container.classList.remove(`${style.rightPanelActive}`);
      });
    };
  }, [transition]);

  useEffect(() => {
    if (logInError || signupError) {
      alert(logInError) || alert(signupError);
    }
  }, [logInError]);

  // useEffect(() => {
  //   if ((user && user.id) || data || signupDone) {
  //     alert('이미 가입하셨습니다');
  //     Router.replace('/');
  //   }
  // }, [user && user.id, signupDone]);

  const handleSignInForm = useCallback(() => {
    dispatch({
      type: AT.LOG_IN_REQUEST,
      data: { email, password },
    });

    Router.replace('/');
  }, [email, password]);

  const handleSignUpForm = useCallback(() => {
    console.log(email, nickname, password);
    dispatch({ type: AT.SIGN_UP_REQUEST, data: { email, nickname, password } });
    alert('회원가입이 완료되었습니다');
  }, [email, nickname, password]);

  return (
    <>
      <Head>{transition ? <title>Drink Come True - Sign Up</title> : <title>Drink Come True - Sign In</title>}</Head>

      <AppLayout>
        <GlobalStyle />
        <div className={`${style.container}`} id="container">
          {/* ----------------------- 회원가입 html ------------------------- */}
          <div className={`${style.formContainer} ${style.signUpContainer}`}>
            <form method="post" action="localhost:3000" onSubmit={handleSignUpForm}>
              <h1>Create Account</h1>
              <div className={style.socialContainer}>
                <GoogleOutlined />
              </div>

              <span>or use your email for registration</span>

              <br />
              <input name="user-email" type="email" value={email} onChange={handleChangeEmail} placeholder="email" />

              <input
                name="user-nickname"
                type="text"
                value={nickname}
                onChange={handleChangeNickname}
                placeholder="nickname"
              />

              <input
                name="user-password"
                value={password}
                onChange={handleChangePassword}
                maxLength={13}
                placeholder="password"
              />

              <div style={{ marginTop: '15px' }}>
                <button>가입하기</button>
              </div>
            </form>
          </div>

          {/* ----------------------- 로그인 html ------------------------- */}
          <div className={`${style.formContainer} ${style.signInContainer}`}>
            <form method="post" action="localhost:3000" onSubmit={handleSignInForm}>
              <h1>Sign in</h1>
              <div className={style.socialContainer}>
                <GoogleOutlined />
              </div>
              <span>or use your account</span>
              <br />
              <input name="user-email" type="email" value={email} onChange={handleChangeEmail} required />
              <input name="user-password" type="password" value={password} onChange={handleChangePassword} required />
              <button>Sign In</button>
            </form>
          </div>

          {/* ----------------------- 반대편 화면 ------------------------- */}
          <div className={style.overlayContainer}>
            <div className={style.overlay}>
              <div className={`${style.overlayPanel} ${style.overlayLeft}`}>
                <h1 style={{ color: 'white' }}>Sign In!</h1>
                <p>로그인 후 서비스를 이용해보세요</p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>

              <div className={`${style.overlayPanel} ${style.overlayRight}`}>
                <h1 style={{ color: 'white' }}>Sign Up</h1>
                <p>회원가입으로 더 많은 서비스를 누려보세요</p>

                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
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
  context.store.dispatch({ type: AT.LOAD_POSTS_REQUEST });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

const GlobalStyle = createGlobalStyle`
body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #28a846;
  background-color: #28a846;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
`;

export default usersign;