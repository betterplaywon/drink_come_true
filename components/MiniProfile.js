import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../actionType';
import Link from 'next/link';

import GoogleLogOutButton from './GoogleLogOutButton';
import { useSession } from 'next-auth/react';

const MiniProfile = () => {
  const dispatch = useDispatch();
  const { Meta } = Card;
  const { user, logOutLoading } = useSelector(state => state.user);
  const { data, status } = useSession();

  const handleLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);
  console.log(data);
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

export default MiniProfile;
