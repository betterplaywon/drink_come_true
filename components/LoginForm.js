import React, { useCallback } from 'react';
import { Form, Button, Input } from 'antd';
import Link from 'next/link';

import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../actionType';

const LoginForm = () => {
  const [email, handleChangeEmail] = useInput('');
  const [password, handleChangePassword] = useInput('');

  const dispatch = useDispatch();
  const { logInLoading } = useSelector(state => state.user);

  const handleSubmitForm = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    <>
      <Form onFinish={handleSubmitForm}>
        <div>
          <label htmlFor="user-email">userEmail</label>
          <br />
          <Input name="user-email" type="email" value={email} onChange={handleChangeEmail} required />
        </div>
        <div>
          <label htmlFor="user-password">password</label>
          <br />
          <Input name="user-password" type="password" value={password} onChange={handleChangePassword} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button type="primary" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>
          <Link href="signup">
            <Button>회원가입</Button>
          </Link>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
