import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameForm from '../components/NicknameForm';
import { useSelector, useDispatch } from 'react-redux';
import * as AT from '../actionType';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import Router from 'next/router';
import useSWR from 'swr';
const profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const fetcher = url => axios.get(url, { withCredentials: true }).then(result => result.data);
  const { data: folllowersData, error: followersError } = useSWR(
    `/${process.env.LOCAL}/user/followers?limit=${followersLimit}`,
    fetcher,
  );
  const { data: folllowingsData, error: followingsError } = useSWR(
    `${process.env.LOCAL}/user/followings?limit=${followingsLimit}`,
    fetcher,
  );

  useEffect(() => {
    if (!(user && user.id)) {
      Router.push('/');
    }
  }),
    [user, user.id];

  const moreViewFollowings = useCallback(() => {
    setFollowingsLimit(prev => prev + 3);
  }, []);

  const moreViewFollowers = useCallback(() => {
    setFollowersLimit(prev => prev + 3);
  }, []);

  if (followersError && followingsError) {
    console.error(followersError && followingsError);
    return <div>following or folllower error</div>;
  }

  if (!user) {
    return 'LOADING';
  }

  return (
    <>
      <Head>
        <title>프로필 타이틀</title>
      </Head>
      <AppLayout>
        <NicknameForm />
        <FollowList
          header="팔로잉"
          data={folllowingsData}
          handleMoreView={moreViewFollowings}
          loading={!folllowingsData && !followingsError}
        />
        <FollowList
          header="팔로워"
          data={folllowersData}
          handleMoreView={moreViewFollowers}
          loading={!folllowersData && !followersError}
        />
      </AppLayout>
    </>
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

export default profile;
