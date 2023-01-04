import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameForm from '../components/NicknameForm';
import { useSelector, useDispatch } from 'react-redux';
import * as AT from '../actionType';

const profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    dispatch({
      type: AT.LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: AT.LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  return (
    <>
      <Head>
        <title>프로필 타이틀</title>
      </Head>
      <AppLayout>
        <NicknameForm />
        <FollowList header="팔로잉" data={user.Followings} />
        <FollowList header="팔로워" data={user.Followers} />
      </AppLayout>
    </>
  );
};

export default profile;
