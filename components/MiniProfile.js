import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as AT from '../actionType';
import Link from 'next/link';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import GoogleLogOutButton from './GoogleLogOutButton';
import { useSession } from 'next-auth/react';

const MiniProfile = () => {
  const dispatch = useDispatch();
  const { Meta } = Card;
  const { user, logOutLoading } = useSelector(state => state.user);
  const { data, status } = useSession();

  const handleLogout = useCallback(() => {
    dispatch({ type: AT.LOG_OUT_REQUEST });
  }, []);

  return (
    <>
      {user && !data ? (
        <div>
          <span style={{ marginRight: '20px', color: 'white' }}>환영합니다, {user.nickname}님</span>
          <Button onClick={handleLogout} loading={logOutLoading}>
            로그아웃
          </Button>
        </div>
      ) : (
        // <Card>
        //   <Meta
        //     avatar={<Avatar>{user.nickname[0]}</Avatar>}
        //     title={user.nickname}
        //     description="오늘은 술을 얼마나 마셨나요"
        //     style={{ marginBottom: '10px' }}
        //   />
        //   <Button onClick={handleLogout} loading={logOutLoading}>
        //     로그아웃
        //   </Button>
        // </Card>

        <GoogleLogOutButton />
      )}
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(async context => {
//   // context 안에 store가 들어있다.
//   console.log('getServerSideProps start');
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({ type: AT.LOAD_MY_INFO_REQUEST });
//   // context.store.dispatch({ type: AT.LOAD_POSTS_REQUEST });
//   context.store.dispatch(END);
//   console.log('getServerSideProps end');
//   await context.store.sagaTask.toPromise();
// });

export default MiniProfile;
