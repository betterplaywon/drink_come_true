import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { Menu, Input, Row, Col, Layout, Breadcrumb, Image, Button } from 'antd';
import Link from 'next/link';
import { qnaList, qnaResult } from '../drinkTestData';
import style from '../styles/drinkTestQna.module.css';
import { current } from 'immer';

const drinkTestQna = () => {
  //   const isClient = typeof document === 'object';
  const [currentNumber, setCurrentNumber] = useState(0);
  //   const question = qnaList[currentNumber].q;
  const questionNumber = qnaList[currentNumber].number;
  const question = qnaList[currentNumber].question;
  const answer = qnaList[currentNumber].choices;

  //   let currentNumber = 0;
  //   let qnaResult = '';
  //   const nextQuestion = () => {
  //     const question = qna[currentNumber];
  //   };

  console.log(qnaList);

  return (
    <AppLayout>
      <div className={style.container}>
        <div className={style.progress}>
          {/* 게이지바 */}
          <div className={style.value}></div>
        </div>

        <div className={style.questionBox}>
          <div className={style.number}>{questionNumber}</div>
          <div className={style.question}>{question}</div>
          <div className={`${style.btn} ${style.btnGray} ${style.choice}`}>{answer[0].text}</div>
          <div className={`${style.btn} ${style.btnGray} ${style.choice}`}>{answer[1].text}</div>
          {/* {answerMapping} */}
        </div>
      </div>
    </AppLayout>
  );
};

export default drinkTestQna;
