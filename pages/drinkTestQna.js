import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { Menu, Input, Row, Col, Layout, Breadcrumb, Image, Button } from 'antd';
import Link from 'next/link';
import Router from 'next/Router';
import { qnaList } from '../drinkTestData';
import usePlus from '../hooks/usePlus';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import * as AT from '../actionType';
import style from '../styles/drinkTestQna.module.css';

const drinkTestQna = () => {
  const [idx, handlePlus] = usePlus(0);
  const questionNumber = qnaList[idx].number;
  const question = qnaList[idx].question;
  const answer = qnaList[idx].choices;
  let drinkTendency = [];

  const isClient = typeof document === 'object';

  console.log(idx);

  // useEffect(() => {
  //   if (isClient) {
  //     return false;
  //   }
  //   const progressValue = document.getElementsByClassName('progressValue');
  //   progressValue.width = (idx + 1) * 10 + '%';

  //   return () => {
  //     progressValue.width = (idx + 1) * 10 + '%';
  //   };
  // }, [idx]);

  useEffect(() => {
    // drinkTendency = drinkTendency + question.choices[choiceNumber].value;
    if (idx === qnaList.length - 1) {
      Router.replace('/drinkTestResult');
    }
  }, [idx]);

  console.log(qnaList);

  return (
    <AppLayout>
      <div className={style.container}>
        <div className={style.progress}>
          {/* 게이지바 */}
          <div className={style.progressValue}></div>
        </div>

        <div className={style.questionBox}>
          <div className={style.number}>{questionNumber}</div>
          <div className={style.question}>{question}</div>
          <div className={`${style.btn} ${style.btnGray} ${style.choice}`} onClick={handlePlus}>
            {answer[0].text}
          </div>
          <div className={`${style.btn} ${style.btnGray} ${style.choice}`} onClick={handlePlus}>
            {answer[1].text}
          </div>
        </div>
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

export default drinkTestQna;
