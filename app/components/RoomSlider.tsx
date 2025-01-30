import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

const RoomSlider = ({ roomData }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="swiper-container w-screen"
        style={{ maxWidth: "100%", overflow: "hidden" }}
      >
        <Swiper
          slidesPerView={1} // Default for mobile
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2, // For tablets
            },
            1024: {
              slidesPerView: 3, // For desktops
            },
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 5000 }}
          className="w-full" // Ensure Swiper takes full width
        >
          {roomData.map((room, index) => (
            <SwiperSlide key={room.id} className="mb-8">
              <Link href={`/detalles?id=${room.id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full w-[87%] lg:w-full">
                  {/* Image Section */}
                  <div className="relative h-48 w-full">
                    <img
                      src={room.img[0]}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3
                      className="text-2xl font-semibold mb-2"
                      style={{ fontFamily: "GreatVibes" }}
                    >
                      {room.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {room.desc}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-700">
                        <span className="font-bold">Size:</span> {room.roomSize}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-bold">Guests:</span> {room.person}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <p className="text-gray-700">
                        <span className="font-bold">Price:</span> $
                        {room.prices.low} - ${room.prices.high}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RoomSlider;
