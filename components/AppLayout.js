import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col, Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import Router from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const AppLayout = ({ children }) => {
  const { data, status } = useSession();
  const router = useRouter();
  const { user } = useSelector(state => state.user);
  const { Search } = Input;
  const { Header, Content, Footer } = Layout;

  const [searchInput, onChangeSearchInput] = useInput('');

  const menuStyle = useMemo(
    () => ({
      padding: '15px',
      backgroundColor: 'black',
      textAlign: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      width: '100%',
    }),
    [],
  );
  const footerStyle = useMemo(() => ({ backgroundColor: 'black', textAlign: 'center' }), []);
  const menuFontColor = useMemo(() => ({ color: 'white' }), []);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  const convertPathUpperCase = path => {
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const path = convertPathUpperCase(router.asPath.slice(1));

  const menuItems = [
    {
      label: (
        <Link href="/">
          <span style={menuFontColor}>DRINK CHECK</span>
        </Link>
      ),
      key: 'home',
    },
    {
      label: (
        <Link href="/cycle">
          <span style={menuFontColor}>음주 주기 체크</span>
        </Link>
      ),
      key: 'cycle',
    },
    {
      label: (
        <Link href="/community">
          <span style={menuFontColor}>커뮤니티</span>
        </Link>
      ),
      key: 'community',
    },
    {
      label: (
        <Link href="/profile">
          <span style={menuFontColor}>프로필</span>
        </Link>
      ),
      key: 'profile',
    },
    {
      label: <Search value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} enterButton />,
      key: 'mail',
    },
    {
      label: (
        <Link href="/signup">
          <span style={menuFontColor}>회원가입</span>
        </Link>
      ),
      key: 'signup',
    },
    {
      label: (
        <Link href="/signin">
          <span style={menuFontColor}>로그인</span>
        </Link>
      ),
      key: 'signin',
    },
  ];

  console.log(path);
  console.log(router);

  return (
    <div>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['2']} style={menuStyle} items={menuItems} />

        <Content
          style={{
            padding: '0 50px',
            // marginBottom: '9px',
            minHeight: '100%',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>

            <Breadcrumb.Item>{path}</Breadcrumb.Item>
          </Breadcrumb>

          <SiteLayoutContent>
            <Row gutter={25}>
              <Col xs={24} md={6}>
                {user || data ? <UserProfile /> : <LoginForm />}
              </Col>
              <Col xs={24} md={12}>
                {children}
              </Col>
            </Row>
          </SiteLayoutContent>
        </Content>
        <Footer style={footerStyle}>
          <span style={menuFontColor}>금주에 성공해 이 서비스를 이용하지 않는 것이 바람직합니다</span>
        </Footer>
      </Layout>
    </div>
  );
};
const SiteLayoutContent = styled.div`
  min-height: 70vh;
  padding: 24px;
  background: #fff;
`;

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
