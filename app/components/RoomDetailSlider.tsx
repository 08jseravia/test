import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const RoomDetailSlider = ({ images }) => {
  if (images?.length == 1)
    return (
      <div className="flex w-full justify-center mx-5 my-4">
        <img
          src={images[0]}
          alt={`slider-image-${0}`}
          className="w-full  lg:my-0 h-full lg:h-[70%] object-cover"
        />
      </div>
    );

  return (
    <div className="mx-auto px-4 py-8">
      <div
        className="swiper-container w-[80vw] lg:w-[40vw]  xl2:w-[25vw]"
        style={{ maxWidth: "100%", overflow: "hidden" }}
      >
        <Swiper
          slidesPerView={1} // Default for mobile
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{ delay: 5000 }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={`slider-image-${index}`} className="mb-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ">
                {/* h-40vh lg:h-[60vh] */}
                {/* Image Section */}
                <div className="relative">
                  {/*  h-[34vh] lg:h-[60vh]  */}
                  <img
                    src={img}
                    alt={`slider-image-${index}`}
                    className="w-full h-[350px] lg:h-[500px] object-fit"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RoomDetailSlider;
