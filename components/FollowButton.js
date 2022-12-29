import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import * as AT from '../actionType';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { user, followLoading, unfollowLoading } = useSelector(state => state.user);
  const isFollowing = user?.Followings.find(m => m.id === post.User.id); // 이 부분 이해안됨
  const handleFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({ type: AT.UNFOLLOW_REQUEST, data: post.User.id });
    } else {
      dispatch({ type: AT.FOLLOW_REQUEST, data: post.User.id });
    }
  }, [isFollowing]);

  return (
    <div>
      <Button loading={followLoading || unfollowLoading} onClick={handleFollow}>
        {isFollowing ? '언팔로우' : '팔로우'}
      </Button>
    </div>
  );
};

export default FollowButton;

FollowButton.proptypes = {
  post: PropTypes.object.isRequired,
};
