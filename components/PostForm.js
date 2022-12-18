import React, { useState, useCallback, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [input, setInput] = useState();

  const { TextArea } = Input;
  const { imagePaths } = useSelector(state => state.post);

  const handleInput = useCallback(e => {
    const value = e.target.value;
    setInput(value);
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(addPost);
    setInput('');
  }, []);

  const handleImage = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: '10px 0 20px' }}>
      <TextArea
        value={input}
        onChange={handleInput}
        placeholder="오늘 술을 마시면서 생겼던 이야기가 있나요?"
        maxLength={100}
      />

      <div>
        <label>
          <input type="file" multiple visibility="hidden" ref={imageInput} />
          <Button onClick={handleImage}>이미지 업로드 테스트 버튼</Button>
          <Button type="primary" onClick={handleSubmit} style={{ float: 'right' }}>
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
