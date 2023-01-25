import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col, Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import MiniProfile from './MiniProfile';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const AppLayout = ({ children }) => {
  const { data, status } = useSession();
  const router = useRouter();
  const { user } = useSelector(state => state.user);
  const { Search } = Input;
  const { Content, Footer } = Layout;

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
    path === 'Community' && {
      label: (
        <Search
          value={searchInput}
          onChange={onChangeSearchInput}
          onSearch={onSearch}
          enterButton
          style={{ marginTop: '8px', background: 'green' }}
        />
      ),
      key: 'mail',
    },
    !(user || data) && {
      label: (
        <Link href="/usersign">
          <span style={menuFontColor}>회원가입 / 로그인</span>
        </Link>
      ),
      key: 'usersign',
    },
    (user || data) && {
      label: <MiniProfile />,
      key: 'miniprofile',
    },
  ];

  return (
    <div>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['2']} style={menuStyle} items={menuItems} />

        <Content
          style={{
            padding: '0 50px',
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
              {/* <Col xs={24} md={6}>
                {user || data ? <UserProfile /> : <LoginForm />}
              </Col> */}
              <Col xs={24} md={4}></Col>
              <Col xs={24} md={16}>
                {children}
              </Col>
              <Col xs={24} md={4}></Col>
            </Row>
          </SiteLayoutContent>
        </Content>
        <Footer style={footerStyle}>
          <span style={menuFontColor}>자신의 술 습관을 아는 그날까지</span>
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
