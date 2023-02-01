import React from 'react';
import AppLayout from '../components/AppLayout';
import { Menu, Input, Row, Col, Layout, Breadcrumb, Image, Button } from 'antd';
import Link from 'next/link';
import style from '../styles/drinkTestMain.module.css';

const drinkTest = () => {
  const isClient = typeof document === 'object';

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
        <div className={`${style.btn} ${style.btnGreen} ${style.btnSmall} ${style.shareOrCopy}`}>주변에 알리기</div>
      </div>
    </AppLayout>
  );
};

export default drinkTest;
