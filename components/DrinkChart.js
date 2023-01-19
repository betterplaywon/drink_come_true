import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as AT from '../actionType';

import Chart from 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';
import AppLayout from '../components/AppLayout';
import { Avatar, Card, Button } from 'antd';

const DrinkChart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const UserData = [
    {
      id: 1,
      // year: 2023,
      month: 9,
      userGain: 10,
      userLost: 3,
    },
    {
      id: 2,
      // year: 2022,
      month: 10,
      userGain: 20,
      userLost: 5,
    },
    {
      id: 3,
      // year: 2020,
      month: 11,
      userGain: 30,
      userLost: 7,
    },
    {
      id: 4,
      // year: 2019,
      month: 12,
      userGain: 40,
      userLost: 9,
    },
    {
      id: 5,
      // year: 2018,
      month: 1,
      userGain: 50,
      userLost: 3,
    },
    {
      id: 6,
      // year: 2018,
      month: 2,
      userGain: 50,
      userLost: 3,
    },
  ];

  const state = {
    labels: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
    datasets: [
      {
        label: '술을 얼마나 마셨는지 체크해보세요',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0, 1, 0, 0, 4, 2, 0],
      },
    ],
  };

  const state2 = {
    labels: ['10월', '11월', '12월', '1월', '2월'],
    datasets: [
      {
        label: '술을 얼마나 마셨는지 체크해보세요',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const [userData, setUserData] = useState({
    labels: UserData.map(data => data.year),
    datasets: [
      {
        label: '술, 얼마나 자주 마시는걸까',
        data: UserData.map(data => data.userGain),
        backgroundColor: ['rgba(35,161,18,1)', '#23a112', '#23a112', '#23a112', '#23a112'],
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  });

  return (
    <Card title="Default size card">
      <div>
        <Bar
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
  );
};

export default DrinkChart;
