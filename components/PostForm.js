import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_POST_REQUEST } from '../actionType';

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, handleText, setText] = useInput('');

  const { TextArea } = Input;
  const { imagePaths, addPostLoading, addPostDone } = useSelector(state => state.post);

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const handleSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: text,
    });
  }, [text]);

  const handleImage = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: '10px 0 20px' }}>
      <TextArea
        value={text}
        onChange={handleText}
        placeholder="오늘 술을 마시면서 생겼던 이야기가 있나요?"
        maxLength={100}
      />

      <div>
        <label>
          <input type="file" multiple hidden ref={imageInput} />
          <Button onClick={handleImage}>이미지 업로드 테스트 버튼</Button>
          <Button type="primary" onClick={handleSubmit} style={{ float: 'right' }} loading={addPostLoading}>
            작성
          </Button>
        </label>
      </div>

      <div>
        {imagePaths.map(image => (
          <div key={image.id}>
            <img src="" alt="" />

            <div>
              <Button>사진 제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
