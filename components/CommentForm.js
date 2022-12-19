import React, { useState, useCallback } from 'react';
import { Form, Input } from 'antd';
import { PropTypes } from 'prop-types';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useInput();
  const { id } = useSelector(state => state.user);

  const handleSubmitComment = useCallback(() => {
    console.log(post.id, commentText); // id 사용해 게시글 아래에 댓글 달기
  }, [commentText]);

  return (
    <Form onFinish={handleSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={setCommentText} rows={4} />
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
