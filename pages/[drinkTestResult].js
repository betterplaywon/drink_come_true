import React, { useEffect } from 'react';
import { qnaResult } from '../drinkTestData';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import * as AT from '../actionType';
import LoadingComp from '../components/LoadingComp';
import useToggle from '../hooks/useToggle';
import style from '../styles/drinkTestResult.module.css';

const AppLayout = dynamic(() => import('../components/AppLayout'));

const drinkTestResult = () => {
  const router = useRouter();
  const [isLoading, handleIsLoading] = useToggle(true);
  const query = router.query.drinkTestResult;
  const isDrink = Number(query[query.length - 1]);
  const qnaResultTitle = qnaResult[isDrink].title;
  const qnaResults = qnaResult[isDrink].results;
  const qnaRecommendFood = qnaResult[isDrink].recommendFood;

  useEffect(() => {
    setTimeout(() => {
      handleIsLoading();
    }, 500);
  }, []);
  console.log('query: ', query);
  console.log('isDrink: ', isDrink);
  return (
    <>
      {isLoading ? (
        <AppLayout>
          <div className={style.loadingContainer}>
            <LoadingComp isLoading={isLoading} />
          </div>
        </AppLayout>
      ) : (
        <AppLayout>
          <div className={style.container}>
            <h2 className={style.pageSubTitle}>나는 술을 좋아할까?</h2>
            <h1 className={style.pageTitle}>{qnaResultTitle}</h1>
            <img
              src="https://i.pinimg.com/550x/6a/ba/d1/6abad1ff1c1558c9d529b94c0079b689.jpg"
              alt="캐릭터"
              className={style.character}
            />
            <div className={style.result}>
              <div className={style.resultBox}>{qnaResults}</div>
            </div>
            <div className={style.result}>
              <h3>이런 음식을 추천드려요!</h3>
              <div className={style.resultJobs}>
                {qnaRecommendFood.map((m, idx) => (
                  <div className={style.resultJob} key={idx}>
                    <img src={m.src} />
                    <p>{m.name}</p>
                  </div>
                ))}
              </div>
            </div>

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
