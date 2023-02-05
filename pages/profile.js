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

import { useSession } from 'next-auth/react';

const profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { data } = useSession();

  const fetcher = url => axios.get(url, { withCredentials: true }).then(result => result.data);

  const { data: followersData, error: followersError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher,
  );
  const { data: followingsData, error: followingsError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher,
  );

  useEffect(() => {
    dispatch({
      type: AT.LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: AT.LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(user && user.id && data)) {
      Router.push('/');
    }
  }),
    [user && user.id, data];

  const moreViewFollowings = useCallback(() => {
    setFollowingsLimit(prev => prev + 3);
  }, []);

  const moreViewFollowers = useCallback(() => {
    setFollowersLimit(prev => prev + 3);
  }, []);

  if (!user || !data) {
    return <div>'LOADING'</div>;
  }

  console.log({ data });

  return (
    <>
      <Head>
        <title>프로필 타이틀</title>
      </Head>
      {user && !data ? (
        <AppLayout>
          <NicknameForm />
          <FollowList
            header="팔로잉"
            data={followingsData}
            handleMoreView={moreViewFollowings}
            loading={!followingsData && !followingsError}
          />
          <FollowList
            header="팔로워"
            data={followersData}
            handleMoreView={moreViewFollowers}
            loading={!followersData && !followersError}
          />
        </AppLayout>
      ) : (
        <AppLayout>
          <div>소셜 로그인 프로필</div>
        </AppLayout>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  console.log('getServerSideProps start');
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
  // context.store.dispatch({ type: AT.LOAD_POSTS_REQUEST });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default profile;
