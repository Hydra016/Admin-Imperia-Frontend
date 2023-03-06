import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import "swiper/css";

const Images = ({ images }) => {
  SwiperCore.use([Autoplay]);
  return (
    <div style={{ width: 300, height: 300 }}>
      <Swiper
        scrollbar={true}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image) => {
          return (
            <SwiperSlide>
              <img
                src={image}
                style={{
                  height: 300,
                  width: 300,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Images;
