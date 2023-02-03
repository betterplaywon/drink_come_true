import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { qnaResult } from '../drinkTestData';
import { Menu, Input, Row, Col, Layout, Breadcrumb, Image, Button } from 'antd';
import Link from 'next/link';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import * as AT from '../actionType';
import LoadingComp from '../components/LoadingComp';
import useToggle from '../hooks/useToggle';
import style from '../styles/drinkTestResult.module.css';

const drinkTestResult = () => {
  const [isLoading, handleIsLoading] = useToggle(true);
  const isClient = typeof document === 'object';
  const qnaResultTitle = qnaResult.title;
  const qnaResultCharacter = qnaResult.character;
  const qnaReults = qnaResult.results;
  const qnaRecommendFood = qnaResult.recommendFood;

  useEffect(() => {
    setTimeout(() => {
      handleIsLoading();
    }, 2500);
  }, []);

  return (
    <>
      {isLoading ? (
        <AppLayout>
          <div className={style.container}>
            <LoadingComp isLoading={isLoading} />
          </div>
        </AppLayout>
      ) : (
        <AppLayout>
          <div className={style.container}>
            <h2 className={style.pageSubTitle}>나는 술을 좋아할까?</h2>
            <h1 className={style.pageTitle}></h1>
            <img
              src="https://i.pinimg.com/550x/6a/ba/d1/6abad1ff1c1558c9d529b94c0079b689.jpg"
              alt="캐릭터"
              className={style.character}
            />
            <div className={style.result}>
              <div className={style.resultBox}></div>
              <div className={style.resultBox}></div>
              <div className={style.resultBox}></div>
              <div className={style.resultBox}></div>
            </div>
            <div className={style.result}>
              <h3>이런 음식을 추천드려요!</h3>
              <div className={style.resultJobs}>
                <div className={style.resultJob}></div>
                <div className={style.resultJob}></div>
              </div>
            </div>
            {/* <div className={style.result}>
              <h3>이런 운동이나 생활 습관은 어떨까요</h3>
              <Link href="">
                <a target="_blank" className={style.resultLecture}>
                  <img src="" alt="강의" />
                </a>
              </Link>
            </div> */}
            {/* <div className={`${style.btn} ${style.btnGreen} ${style.btnSmall} `}>결과 공유하기</div> */}
            <Link href="/drinktest">
              <a className={`${style.btn} ${style.btnGray} ${style.btnSmall} `}>다시 테스트하기</a>
            </Link>
          </div>
        </AppLayout>
      )}
    </>
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

export default drinkTestResult;
