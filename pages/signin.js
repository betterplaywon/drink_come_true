import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import Link from 'next/link';

import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../actionType';
import GoogleLogInButton from '../components/GoogleLogInButton';
import { useSession } from 'next-auth/react';

import style from '../styles/signin.module.css';
import styled, { createGlobalStyle } from 'styled-components';

const signin = () => {
  const isClient = typeof document === 'object';

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('rightPanel-active');
    });

    return () =>
      signInButton.addEventListener('click', () => {
        console.log(22222222);
        container.classList.remove('rightPanel-active');
      });
  }, []);

  // ---------------------

  return (
    <>
      <Head>
        <title>Drink Come True - Sign In</title>
      </Head>

      {/* <AppLayout>s */}
      <GlobalStyle />
      <div className={style.container} id="container">
        <div className={`${style.formContainer} ${style.signUpContainer}`}>
          <form action="#">
            <h1>Create Account</h1>
            <div className={style.socialContainer}>
              <a href="#" className="social">
                <i className="fab fa-naver-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className={`${style.formContainer} ${style.signInContainer}`}>
          <form action="#">
            <h1>Sign in</h1>
            <div className={style.socialContainer}>
              <a href="#" className="social">
                <i className="fab fa-naver-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className={style.overlayContainer}>
          <div className={style.overlay}>
            <div className={`${style.overlayPanel} ${style.overlayLeft}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className={`${style.overlayPanel} ${style.overlayRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

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

export default signin;
