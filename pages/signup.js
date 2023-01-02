import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { AppleOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../actionType';
import Router from 'next/router';

const signup = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError, user } = useSelector(state => state.user);
  const [email, handleChangeEmail] = useInput('');
  const [nickname, handleChangeNickname] = useInput('');
  const [password, handleChangePassword] = useInput('');

  useEffect(() => {
    if (user && user.id) {
      Router.replace('/');
    }
  }, [user && user.id]);

  useEffect(() => {
    if (signupDone) {
      Router.replace('/');
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  const onSubmit = useCallback(() => {
    console.log(email, nickname, password);
    dispatch({ type: SIGN_UP_REQUEST, data: { email, nickname, password } });
  }, [email, nickname, password]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">계정</label>
          <br />
          <input name="user-email" type="email " value={email} onChange={handleChangeEmail} />
        </div>

        <div>
          <label htmlFor="user=password">닉네임</label>
          <br />
          <input name="user=password" value={nickname} onChange={handleChangeNickname} />
        </div>

        <div>
          <label htmlFor="user=password">비밀번호</label>
          <br />
          <input name="user=password" value={password} onChange={handleChangePassword} maxLength={13} />
        </div>
        <div style={{ marginTop: '15px' }}>
          <Button type="primary" htmlType="submit" loading={signupLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};
export default signup;
