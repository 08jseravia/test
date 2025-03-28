"use client"; // Add this directive to ensure the component is client-side

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const LiveMusicCarousel = () => {
  const slides = [
    {
      id: 1,
      imageSrc: "/assets/MusicSection/1.webp",
      alt: "group of people dancing in a party",
    },
    {
      id: 2,
      imageSrc: "/assets/MusicSection/2.webp",
      alt: "group of people dancing in a party",
    },
  ];

  return (
    <div className="my-8 grid grid-cols-1 max-lg:px-8 max-md:px-6 lg:gap-24 delay-100 duration-1000 opacity-100 transition-all translate-y-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div className="relative mb-8 lg:mb-0 lg:order-2">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-21",
            prevEl: ".swiper-button-prev-21",
          }}
          loop={true}
          spaceBetween={16}
          slidesPerView={1}
          className="relative h-[365px] w-full lg:h-full lg:min-h-[750px] lg:pr-32 xl:pr-72"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full transition-all lg:group-[:not(.swiper-slide-active)]:h-5/6">
                <Image
                  alt={slide.alt}
                  loading="lazy"
                  decoding="async"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  src={slide.imageSrc}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Carousel Navigation Buttons */}
        <div className="absolute top-1/2 z-10 flex h-0 w-full justify-between lg:pr-32 xl:pr-72">
          <button className="swiper-button-prev-21 bg-[#205172] anim--linear group inline-flex items-center justify-center rounded-full leading-none -translate-x-[calc(50%)] -translate-y-1/2 !text-[var(--carousel-arrow-fill)] max-lg:max-h-[48px] max-lg:max-w-[48px] lg:-translate-x-[calc(50%+8px)] h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
            <svg
              width="40%"
              height="40%"
              viewBox="0 0 33 16"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className="xl:anim--default text-sm xl:scale-100 group-hover:xl:scale-125"
            >
              <title id="ArrowLeft">Arrow Left Icon</title>
              <path
                d="M6.65685 15.0711L0.292893 8.70716C-0.0976289 8.31663 -0.0976289 7.68347 0.292893 7.29294L6.65686 0.928982C7.04738 0.538458 7.68055 0.538458 8.07107 0.928982C8.46159 1.31951 8.46159 1.95267 8.07107 2.3432L3.41421 7.00005L33 7.00005L33 9.00005L3.41421 9.00005L8.07107 13.6569C8.46159 14.0474 8.46159 14.6806 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711Z"
                fill="white"
              />
            </svg>
          </button>
          <button className="swiper-button-next-21 bg-[#205172] anim--linear group inline-flex items-center justify-center rounded-full leading-none -translate-y-1/2 translate-x-[calc(50%)] !text-[var(--carousel-arrow-fill)] max-lg:max-h-[48px] max-lg:max-w-[48px] lg:translate-x-[calc(50%+8px)] h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
            <svg
              width="40%"
              height="40%"
              viewBox="0 0 33 16"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className="xl:anim--default text-sm xl:scale-100 group-hover:xl:scale-125"
            >
              <title id="ArrowRight">Arrow Right Icon</title>
              <path
                d="M26.3431 0.92888L32.7071 7.29284C33.0976 7.68336 33.0976 8.31653 32.7071 8.70705L26.3431 15.071C25.9526 15.4615 25.3195 15.4615 24.9289 15.071C24.5384 14.6805 24.5384 14.0473 24.9289 13.6568L29.5858 8.99995H0V6.99995H29.5858L24.9289 2.34309C24.5384 1.95257 24.5384 1.3194 24.9289 0.92888C25.3195 0.538355 25.9526 0.538355 26.3431 0.92888Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative flex flex-col justify-center lg:px-8 lg:order-1 lg:pl-16 lg:pr-0">
        <h2
          className="text-[36px] leading-tight md:text-[44px] lg:text-[48px] bg-clip-text font-alt bg-[url:var(--headings-bg-image)] mb-6 last:mb-0 text-blue-900"
          style={{ fontFamily: "GreatVibes" }}
        >
          Música en Vivo
        </h2>
        <div className="text-base leading-[34px] md:text-[17px] md:leading-[37px] lg:text-lg lg:leading-[38px] mb-10 text-[var(--cta-carousel-body-color)]">
          <p
            dir="ltr"
            id="st-somewhere"
            className="mb-3 last:mb-0 empty:hidden"
            style={{ fontFamily: "Rubik" }}
          >
            Nada se compara con la emoción de la música en vivo&nbsp;. Ya sea un
            solista o una banda tocando clásicos o éxitos del momento, el
            entretenimiento nunca termina. Disfruta de shows en directo por todo
            el resort durante tu visita.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveMusicCarousel;
