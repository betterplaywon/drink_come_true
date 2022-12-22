import React, { useCallback } from 'react';
import { Form, Button, Input } from 'antd';
import Link from 'next/link';

import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const [id, handleChangeId] = useInput('');
  const [password, handleChangePassword] = useInput('');

  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector(state => state.user);

  const handleSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ id, password }));
  }, [id, password]);

  return (
    <>
      <Form onFinish={handleSubmitForm}>
        <div>
          <label htmlFor="user-id">userId</label>
          <br />
          <Input name="user-id" value={id} onChange={handleChangeId} required />
        </div>
        <div>
          <label htmlFor="user-password">password</label>
          <br />
          <Input name="user-password" type="password" value={password} onChange={handleChangePassword} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button type="primary" htmlType="submit" loading={isLoggingIn}>
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
