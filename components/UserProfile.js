import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../actionType';

const UserProfile = () => {
  const { Meta } = Card;
  const { user, logOutLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);

  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
      actions={[
        <div key="twit">
          좋아요
          <br /> {user.Posts.length}
        </div>,
        <div key="followers">
          팔로워
          <br /> {user.Followers.length}
        </div>,
        <div key="followings">
          팔로잉
          <br /> {user.Followings.length}
        </div>,
      ]}
    >
      <Meta
        // avatar={<Avatar>{user.nickname[0]}</Avatar>}
        // title={user.nickname[0]}
        description="오늘은 술을 얼마나 마셨나요"
        style={{ marginBottom: '10px' }}
      />
      <Button onClick={handleLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
