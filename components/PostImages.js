import React from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import useToggle from '../hooks/useToggle';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, toggleZoom] = useToggle(false);

  if (images.length === 1) {
    return (
      <>
        <img
          style={{ width: '25%', display: 'inline-block' }}
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={toggleZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} toggleZoom={toggleZoom} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img
          style={{ width: '25%', display: 'inline-block' }}
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={`http://localhost:3065/${images[0].src}`}
          onClick={toggleZoom}
        />
        <img
          style={{ width: '25%', display: 'inline-block' }}
          role="presentation"
          src={`http://localhost:3065/${images[1].src}`}
          alt={`http://localhost:3065/${images[1].src}`}
          onClick={toggleZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} toggleZoom={toggleZoom} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img
          style={{ width: '25%', display: 'inline-block' }}
          src={`http://localhost:3065/${images[0].src}`}
          alt="communityImage"
        />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '25%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={toggleZoom}
        >
          <PlusOutlined />
          <br />
          <span>{images.length - 1}개의 사진 더보기</span>
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} toggleZoom={toggleZoom} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
