import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import * as AT from '../actionType';

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
    const formData = new FormData();
    imagePaths.forEach(m => {
      formData.append('image', m);
    });
    formData.append('content', text);

    return dispatch({
      type: AT.ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onChangeImages = useCallback(e => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: AT.IMAGE_UPLOAD_REQUEST,
      data: imageFormData,
    });
  }, []);

  const handleImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImages = useCallback(
    imageIdx => () => {
      dispatch({
        type: AT.IMAGE_REMOVE,
        data: imageIdx,
      });
    },
    [],
  );

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data">
      <TextArea
        value={text}
        onChange={handleText}
        placeholder="오늘 술을 마시면서 생겼던 이야기가 있나요?"
        maxLength={100}
      />

      <div>
        <label>
          <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <Button onClick={handleImageUpload}>이미지 업로드</Button>
          <Button
            type="primary"
            style={{ float: 'right', width: '25%' }}
            htmlType="submit"
            onClick={handleSubmit}
            loading={addPostLoading}
          >
            작성
          </Button>
        </label>
      </div>

      <div>
        {imagePaths?.map((image, idx) => (
          <div key={image.id}>
            <img
              src={`http://localhost:3065/${image}`}
              alt="postImages"
              style={{ width: '25%', display: 'inline-block' }}
            />

            <div>
              <Button onClick={onRemoveImages(idx)}>사진 제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
