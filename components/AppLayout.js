import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import Router from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const AppLayout = ({ children }) => {
  const menuStyle = useMemo(() => ({ padding: '15px' }), []);
  const { user } = useSelector(state => state.user);
  const { Search } = Input;
  const { data, status } = useSession();
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  const menuItems = [
    { label: <Link href="/">DRINK CHECK</Link>, key: 'home' },
    { label: <Link href="/cycle">음주 주기 체크</Link>, key: 'cycle' },
    { label: <Link href="/community">커뮤니티</Link>, key: 'community' },
    { label: <Link href="/profile">프로필</Link>, key: 'profile' },
    { label: <Link href="/signup">회원가입</Link>, key: 'signup' },
    {
      label: <Search value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} enterButton />,
      key: 'mail',
    },
  ];

  return (
    <div>
      <Menu mode="horizontal" style={menuStyle} items={menuItems} />

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {user || data ? <UserProfile /> : <LoginForm />}
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
