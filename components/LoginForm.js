import React, { useState, useCallback } from 'react'
import { Form, Button, Input } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import propTypes from 'prop-types'
import useInput from '../hooks/useInput'

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, handleChangeId] = useInput('')
  const [password, handleChangePassword] = useInput('')

  const handleSubmitForm = useCallback(() => {
    console.log({ id, password })
    setIsLoggedIn(true)
  }, [id, password])

  const ButtonContainer = styled.div`
    margin-top: 10px;
  `

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
        <ButtonContainer>
          <Button type="primary" htmlType="submit" loading={false}>
            로그인
          </Button>
          <Link href="signup">
            <Button>회원가입</Button>
          </Link>
        </ButtonContainer>
      </Form>
    </>
  )
}

LoginForm.propTypes = {
  setIsLoggedIn: propTypes.func.isRequiered,
}

export default LoginForm
