import React, { useState, useCallback } from 'react';
import { Card, Button, Popover, List, Avatar, Comment } from 'antd';
import { HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useToggle from '../hooks/useToggle';
import Link from 'next/link';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

const PostCard = ({ post }) => {
  const { user } = useSelector(state => state.user);
  const { Meta } = Card;
  const id = user?.id;

  const [liked, onToggleLike] = useToggle(false);

  const [isCommentFormOpend, onToggleCommentFormOpen] = useToggle(false);

  return (
    <div style={{ marginBottom: '10px' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <>
            {liked ? (
              <HeartTwoTone twoToneColor="#eb2f96" onClick={onToggleLike} />
            ) : (
              <HeartOutlined key="like" onClick={onToggleLike} />
            )}
          </>,
          <MessageOutlined key="comment" onClick={onToggleCommentFormOpen} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id && (
                  <>
                    <Button type="primary">수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Meta
          avatar={<Avatar>{post.User.name[0]}</Avatar>}
          title={post.User.name}
          description={<PostCardContent postContent={post.content} />}
        />
      </Card>

      {isCommentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            itemLayout="horizontal"
            header={`${post.Comments.length}개의 댓글`}
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment author={item.User.name} content={item.content} />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
