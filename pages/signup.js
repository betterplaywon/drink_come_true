import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { AppleOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../actionType';

const signup = () => {
  const dispatch = useDispatch();
  const { signupLoading } = useSelector(state => state.user);
  const [email, handleChangeEmail] = useInput('');
  const [password, handleChangePassword] = useInput('');

  const onSubmit = useCallback(() => {
    console.log(email, password);
    dispatch({ type: SIGN_UP_REQUEST, data: { email, password } });
  }, [email, password]);

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
          <label htmlFor="user=password">비밀번호</label>
          <br />
          <input name="user=password" value={password} onChange={handleChangePassword} />
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
