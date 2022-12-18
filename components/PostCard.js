import React from 'react';
import { Card, Button, Popover, Avatar } from 'antd';
import { LikeOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import PostImages from './PostImages';

const PostCard = ({ post }) => {
  const { user } = useSelector(state => state.user);
  const { Meta } = Card;
  const id = user?.id;

  return (
    <div style={{ marginBottom: '10px' }}>
      <Card
        cover={post?.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <LikeOutlined key="like" />,
          <MessageOutlined key="comment" />,
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
        <img src={post.Images} />
        <Meta title={post.User.name} description={post.content} />
      </Card>

      <div>
        <CommentForm />
        <Comments />
      </div>
    </div>
  );
};

const CommentForm = styled.form``;
const Comments = styled.div``;

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
