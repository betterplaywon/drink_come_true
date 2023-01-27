import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as AT from '../actionType';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import Router from 'next/router';

import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { Card, Row } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const DrinkChart = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.user);
  const userContent = user?.Posts.map(c => c.content);

  const test = userContent => {
    const sojuResult = [];
    const beerResult = [];
    const whiskyResult = [];
    const cocktailResult = [];
    const highballResult = [];
    const kaoliangWineResult = [];
    const makgeolliResult = [];

    for (let i = 0; i < userContent.length; i++) {
      if (userContent[i].indexOf('소주' || '#소주') > -1) {
        sojuResult.push(userContent[i]);
      }
      if (userContent[i].indexOf('위스키' || '#위스키') > -1) {
        whiskyResult.push(userContent[i]);
      }
      if (userContent[i].indexOf('맥주' || '#맥주') > -1) {
        beerResult.push(userContent[i]);
      }
      if (userContent[i].indexOf('칵테일' || '#칵테일') > -1) {
        cocktailResult.push(userContent[i]);
      }
      if (userContent[i].indexOf('하이볼') > -1) {
        highballResult.push(userContent[i]);
      }
      if (userContent[i].indexOf('고량주') > -1) {
        kaoliangWineResult.push(userContent[i]);
      }
      if (userContent[i].indexOf('막걸리') > -1) {
        makgeolliResult.push(userContent[i]);
      }
    }
    return {
      beerResult,
      sojuResult,
      whiskyResult,
      cocktailResult,
      highballResult,
      kaoliangWineResult,
      makgeolliResult,
    };
  };

  const testArr = test(userContent);

  const state = {
    labels: ['맥주', '소주', '위스키', '칵테일', '하이볼', '고량주', '막걸리'],
    datasets: [
      {
        label: '술을 얼마나 마셨는지 체크해보세요',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
        data: [
          testArr.beerResult.length,
          testArr.sojuResult.length,
          testArr.whiskyResult.length,
          testArr.cocktailResult.length,
          testArr.highballResult.length,
          testArr.kaoliangWineResult.length,
          testArr.makgeolliResult.length,
        ],
        lineTension: 0.5,
      },
    ],
  };

  return (
    <div>
      <Row gutter={24}>
        <Card>
          <p>어떤 술을 마셨는지 확인해볼까요?</p>
        </Card>

        <Card title="내가 제일 자주 마신 술은?">
          <div>
            <Pie
              data={state}
              options={{
                title: {
                  display: true,
                  text: 'Average Rainfall per month',
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: 'right',
                },
              }}
            />
          </div>
        </Card>
      </Row>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  // context 안에 store가 들어있다.
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

export default DrinkChart;
