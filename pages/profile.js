import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameForm from '../components/NicknameForm';

const profile = () => {
  const followerList = [{ nickname: 'james' }, { nickname: 'irving' }, { nickname: 'curry' }];
  const followingList = [{ nickname: 'james' }, { nickname: 'irving' }, { nickname: 'curry' }];

  return (
    <>
      <Head>
        <title>프로필 타이틀</title>
      </Head>
      <AppLayout>
        <NicknameForm />
        <FollowList header="팔로워목록" data={followerList} />
        <FollowList header="팔로잉목록" data={followingList} />
      </AppLayout>
    </>
  );
};

export default profile;
