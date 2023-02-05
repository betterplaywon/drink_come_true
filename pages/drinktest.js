import React from 'react';
import AppLayout from '../components/AppLayout';
import { Menu, Input, Row, Col, Layout, Breadcrumb, Image, Button } from 'antd';
import Link from 'next/link';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import * as AT from '../actionType';
import style from '../styles/drinkTestMain.module.css';

const drinkTest = () => {
  return (
    <AppLayout>
      <div className={style.container}>
        <h2 className={`${style.pageSubtitle}`}>알콜 러버 테스트</h2>
        <h1 className={`${style.pageTitle}`}>
          내 안에 잠든
          <br />
          주당을 찾자
        </h1>
        <img
          src="https://pbs.twimg.com/media/BAj8nUECYAEQc5x.jpg"
          alt="캐릭터"
          className={style.character}
          style={{ display: 'block' }}
        />
        <Link href="/drinkTestQna">
          <a className={`${style.btn} ${style.btnOrange}`}>TEST GO</a>
        </Link>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: AT.LOAD_POSTS_REQUEST });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default drinkTest;
