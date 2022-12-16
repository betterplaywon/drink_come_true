import React, { useState, useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';

const PostForm = () => {
  const [input, setInput] = useState();

  const { TextArea } = Input;
  const { imagePaths } = useSelector(state => state.post);

  const handleInput = useCallback(e => {
    const value = e.target.value;
    console.log(value);
  }, []);

  return (
    <Form>
      <TextArea
        value={input}
        onChange={handleInput}
        placeholder="오늘 술을 마시면서 생겼던 상황 썰 푼다"
        maxLength={100}
      ></TextArea>

      <div>
        <label>
          <input type="file" />
        </label>
        <Button type="primary">작성</Button>
      </div>

      <div>
        {/* {imagePaths.map(image => (
          <div key={image.id}>
            <img src="" alt="" />

            <div>
              <Button>사진 제거</Button>
            </div>
          </div>
        ))} */}
      </div>
    </Form>
  );
};

export default PostForm;
