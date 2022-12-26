import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../actionType';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const [commentText, handleCommentText, setCommentText] = useInput('');
  const { id } = useSelector(state => state.user);
  const { addCommentLoading, addCommentDone } = useSelector(state => state.post);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const handleSubmitComment = useCallback(() => {
    console.log(post.id, commentText); // id 사용해 게시글 아래에 댓글 달기
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, id: post.Id, userId: id },
    });
  }, [commentText]);

  return (
    <Form onFinish={handleSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={handleCommentText} rows={4} />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          작성
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
