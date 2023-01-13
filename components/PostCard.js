import React, { useState, useCallback } from 'react';
import { Card, Button, Popover, List, Avatar, Comment, Space } from 'antd';
import { HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useToggle from '../hooks/useToggle';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import * as AT from '../actionType';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.user);
  const { Meta } = Card;
  const id = user?.id;
  const liked = post.Likers.find(m => m.id === id);

  const [isCommentFormOpen, onToggleCommentFormOpen] = useToggle(false);

  const activeLiked = useCallback(() => {
    if (!id) {
      return alert('로그인 후 이용해주세요');
    }
    return dispatch({
      type: AT.LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const inActiveLiked = useCallback(() => {
    if (!id) {
      return alert('로그인 후 이용해주세요');
    }
    return dispatch({
      type: AT.UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: AT.REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <div style={{ marginBottom: '10px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="like" onClick={inActiveLiked} />
          ) : (
            <HeartOutlined key="like" onClick={activeLiked} />
          ),

          <MessageOutlined key="comment" onClick={onToggleCommentFormOpen} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id && (
                  <>
                    <Button type="primary">수정</Button>
                    <Button type="danger" onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <div style={{ float: 'right' }}>{dayjs(post.createdAt).format('YYYY.MM.DD.dddd.HH:mm')}</div>
        <Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postContent={post.content} />}
        />
      </Card>

      {isCommentFormOpen && (
        <div>
          <CommentForm post={post} />
          <List
            itemLayout="horizontal"
            header={`${post.Comments.length}개의 댓글`}
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment author={item.User.nickname} content={item.content} />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default PostCard;
