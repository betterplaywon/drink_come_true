import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col, Search } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import { useSelector } from 'react-redux';

const AppLayout = ({ children }) => {
  const menuStyle = useMemo(() => ({ padding: '15px' }), []);

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div>
      <Menu mode="horizontal" style={menuStyle}>
        <Menu.Item key="home">
          <Link href="/">Drink Come True</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <SearchInput />
        </Menu.Item>
      </Menu>

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
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

const SearchInput = styled(Input.Search)`
  verticalalign: 'middle';
`;

export default AppLayout;
