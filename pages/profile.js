import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameForm from '../components/NicknameForm';
import { useSelector } from 'react-redux';

const profile = () => {
  const { user } = useSelector(state => state.user);

  return (
    <>
      <Head>
        <title>프로필 타이틀</title>
      </Head>
      <AppLayout>
        <NicknameForm />
        <FollowList header="팔로잉목록" data={user.Floowings} />
        <FollowList header="팔로워목록" data={user.Followers} />
      </AppLayout>
    </>
  );
};

export default profile;
