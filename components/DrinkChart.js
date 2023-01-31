import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as AT from '../actionType';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { Card, Row, Col, Divider } from 'antd';

const DrinkChart = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.user);
  const userContent = user?.Posts.map(c => c.content);

  const drinkContent = useCallback(
    userContent => {
      const sojuResult = [];
      const beerResult = [];
      const whiskyResult = [];
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
        kaoliangWineResult,
        makgeolliResult,
      };
    },
    [userContent],
  );
  const drinkContentArray = drinkContent(userContent);

  const drinkData = {
    labels: ['맥주', '소주', '위스키', '고량주', '막걸리'],
    datasets: [
      {
        label: '술을 얼마나 마셨는지 체크해보세요',
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(150, 75, 2, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(150, 75, 2, 1)',
        ],
        borderWidth: 2,
        data: [
          drinkContentArray.beerResult.length,
          drinkContentArray.sojuResult.length,
          drinkContentArray.whiskyResult.length,
          drinkContentArray.kaoliangWineResult.length,
          drinkContentArray.makgeolliResult.length,
        ],

        compareMaxDrink: [
          ['맥주', drinkContentArray.beerResult.length],
          ['소주', drinkContentArray.sojuResult.length],
          ['위스키', drinkContentArray.whiskyResult.length],
          ['고량주', drinkContentArray.kaoliangWineResult.length],
          ['막걸리', drinkContentArray.makgeolliResult.length],
        ],
        lineTension: 0.5,
      },
    ],
  };

  const compareMaxDrink = drinkData?.datasets[0].compareMaxDrink.map(v => v);
  const maxDrinkCount = compareMaxDrink.map(v => v[1]);

  const qwerFunc = () => {
    let result = [];
    const spreadMaxDrinkCount = Math.max(...maxDrinkCount);

    for (let i = 0; i < compareMaxDrink.length; i++) {
      if (compareMaxDrink[i][1] === spreadMaxDrinkCount) {
        result.push(compareMaxDrink[i]);
      }
    }
    return (
      <div>
        <span>{`${result[0][0]} 술자리가 `}</span>
        <span style={{ fontWeight: 'bold', fontSize: '19px' }}>{`${result[0][1]}번으로 `}</span>
        <span>가장 많네요!</span>
      </div>
    );
  };

  return (
    <div>
      <Row gutter={24}>
        <Col span={12}>
          <Card>
            <p>어떤 술을 가장 많이 마셨는지 확인해볼까요?</p>
            <p style={{ marginBottom: '40px', color: 'lightGray' }}>작성한 게시글 데이터를 기반으로 한 그래프입니다</p>
            <p>{qwerFunc()}</p>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="내가 제일 자주 마신 술은?">
            <div>
              <Pie
                data={drinkData}
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
        </Col>
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
