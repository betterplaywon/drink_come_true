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
        <h2 class="page-subtitle">내 본캐는?!</h2>
        <h1 class="page-title"></h1>
        <img src="" alt="캐릭터" class="character" />
        <div class="result">
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
        <div class="result">
          <h3>이런 내가 직업을 갖는다면?</h3>
          <div class="jobs">
            <div class="job"></div>
            <div class="job"></div>
          </div>
        </div>
        <div class="result">
          <h3>이런 직업 강의는 어떤가요?</h3>
          <a href="" target="_blank" class="lecture">
            <img src="" alt="강의" />
          </a>
        </div>
        <div class="btn btn-green btn-small share-or-copy">결과 공유하기</div>
        <a href="/" class="btn btn-gray btn-small">
          다시 테스트하기
        </a>
      </div>
    </AppLayout>
  );
};

export default drinkTest;
