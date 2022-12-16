import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../reducers/user';

const UserProfile = () => {
  const { Meta } = Card;
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logOutAction());
  }, []);

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
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="술은 이루어진다"
        description="show your drink"
      />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
