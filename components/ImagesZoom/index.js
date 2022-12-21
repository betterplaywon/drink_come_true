import React from 'react';
import PropTypes from 'prop-types';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

const ImagesZoom = ({ images, toggleZoom }) => {
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={swiper => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {images.map((drinkImage, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div>
                <img style={{ width: '50%', display: 'inline-block' }} src={drinkImage.src} alt={drinkImage.src} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleZoom: PropTypes.func.isRequired,
};
export default ImagesZoom;
