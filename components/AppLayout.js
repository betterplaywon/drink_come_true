import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import { useSelector } from 'react-redux';

const AppLayout = ({ children }) => {
  const menuStyle = useMemo(() => ({ padding: '15px' }), []);

  const { user } = useSelector(state => state.user);
  const { Search } = Input;

  const menuItems = [
    { label: <Link href="/">DRINK CHECK</Link>, key: 'home' },
    { label: <Link href="/profile">프로필</Link>, key: 'profile' },
    { label: <Link href="/signup">회원가입</Link>, key: 'signup' },
    { label: <Search />, key: 'mail' },
  ];

  return (
    <div>
      <Menu mode="horizontal" style={menuStyle} items={menuItems} />

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {user ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          RIGHT SIDE
        </Col>
      </Row>
    </div>
  );
};
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
