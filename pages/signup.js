import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { AppleOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';
import useInput from '../hooks/useInput';

const signup = () => {
  const [id, handleChangeId] = useInput('');
  const [password, handleChangePassword] = useInput('');

  const onSubmit = useCallback(() => {
    console.log(id, password);
  }, [id, password]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">계정</label>
          <br />
          <input name="user-id" value={id} onChange={handleChangeId} />
        </div>

        <div>
          <label htmlFor="user=password">비밀번호</label>
          <br />
          <input name="user=password" value={password} onChange={handleChangePassword} />
        </div>
        <div style={{ marginTop: '15px' }}>
          <Button type="primary" htmlType="submit">
            가입 완료
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};
export default signup;
