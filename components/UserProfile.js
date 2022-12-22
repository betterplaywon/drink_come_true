import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const { Meta } = Card;
  const { user, isLoggingOut } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  console.log(user);
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
      actions={[
        <div key="twit">
          좋아요
          <br /> 0
        </div>,
        <div key="followers">
          팔로워
          <br /> 0
        </div>,
        <div key="followings">
          팔로잉
          <br /> 0
        </div>,
      ]}
    >
      <Meta
        // avatar={<Avatar>{user.nickname[0]}</Avatar>}
        // title={user.nickname[0]}
        description="오늘은 술을 얼마나 마셨나요"
        style={{ marginBottom: '10px' }}
      />
      <Button onClick={handleLogout} loading={isLoggingOut}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
