import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from './AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import * as AT from '../actionType';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import Router from 'next/router';

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const DrinkChart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  const [userData, setUserData] = useState({
    labels: UserData.map(data => data.year),
    datasets: [
      {
        label: 'Users Gained',
        data: UserData.map(data => data.userGain),
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    if (!(user && user.id)) {
      Router.push('/');
    }
  }),
    [user && user.id];

  return (
    <div style={{ width: 700 }}>
      <Line type="line" data={userData} />
    </div>
  );
};

export default DrinkChart;
