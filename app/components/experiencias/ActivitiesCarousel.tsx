"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const ActivitiesCarousel = () => {
  const slides = [
    {
      id: 1,
      imageSrc: "/assets/experiences/activity4.webp",
      alt: "gym",
      title: "Centro de Fitness ¡Fins Up!",
      description:
        "Disfruta de una sesión de estiramiento matutino en nuestra terraza al aire libre de 700 pies cuadrados con vista al manglar. La instalación de 2,000 pies cuadrados cuenta con equipos de cardio y entrenamiento de fuerza de última generación.",
    },
    {
      id: 2,
      imageSrc: "/assets/experiences/activity1.webp",
      alt: "pickeball field",
      title: "Compite",
      description:
        "Aquí encontrarás muchas actividades competitivas para retar a tus amigos. Desde cornhole y voleibol hasta ping pong y pickleball.",
    },
    {
      id: 3,
      imageSrc: "/assets/experiences/activity2.webp",
      alt: "bartender making a drink",
      title: "Mezcla tu propia Margarita",
      description:
        "¿Quieres divertirte un rato en el bar? Apúntate en una de las clases interactivas de mixología y aprende a preparar una deliciosa margarita al estilo de Margaritaville.",
    },
    {
      id: 4,
      imageSrc: "/assets/experiences/activity3.webp",
      alt: "a board game",
      title: "Juegos de cartas y de mesa",
      description:
        "Pon a prueba tu cara de póquer y juega por dinero con los clásicos juegos de cartas y de mesa.",
    },
  ];
  return (
    <section className="py-8 lg:py-16 delay-100 duration-1000 opacity-100 transition-all translate-y-0">
      <div className="c-container px-6 md:px-8 lg:px-12 2xl:px-20 mx-auto">
        {/* Title Section */}
        <div className="mb-6 empty:hidden xl:mb-10 grid-cols-1 items-center 2xl:grid 2xl:grid-cols-[1fr_auto_1fr] 2xl:gap-12">
          <div className="text-center 2xl:col-start-2">
            <h2
              className="text-[36px] text-blue-900 leading-tight md:text-[44px] lg:text-[48px] font-[var(--headings-font-weight)] bg-clip-text font-alt bg-[url:var(--headings-bg-image)] [text-transform:var(--headings-text-transform)]  inline-block max-2xl:mb-3"
              style={{ fontFamily: "GreatVibes" }}
            >
              Un sinfín de actividades
            </h2>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative z-0">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-1",
              prevEl: ".swiper-button-prev-1",
            }}
            loop={true}
            spaceBetween={80}
            slidesPerView={1}
            className="px-6 md:px-20 xl:px-60"
          >
            {slides.map((slide) => (
              <SwiperSlide key={`activity-${slide.id}`}>
                <div className="relative h-[70vh] sm:h-[80vh] lg:aspect-[183/115] lg:h-auto">
                  <div
                    className="absolute right-0 top-[-1px] z-10 hidden aspect-[3/1] bg-[white] lg:block"
                    style={{
                      clipPath: 'url("#centered-carousel-clip-path")',
                      width: "var(--centered-carousel-clip-path-width, 0px)",
                    }}
                  ></div>
                  <Image
                    alt={slide.alt}
                    loading="lazy"
                    decoding="async"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 100vw, 80vw"
                    src={slide.imageSrc}
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      inset: "0px",
                      color: "transparent",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.85)]"></div>
                  <div className="absolute bottom-0 left-0 w-full max-w-[850px] p-8 text-white lg:p-24 lg:pb-16">
                    <h2
                      style={{ fontFamily: "GreatVibes" }}
                      className="text-[36px] leading-tight md:text-[44px] lg:text-[48px] bg-clip-text font-alt bg-[url:var(--headings-bg-image)] text-[var(--headings-text-color-primary)] mb-4 tracking-[0.05em] last:mb-0 [font-family:var(--centered-carousel-slide-title-font)] [text-transform:var(--centered-carousel-slide-title-text-transform)] text-white [font-weight:var(--centered-carousel-slide-title-font-weight)]"
                    >
                      {slide.title}
                    </h2>
                    <div className="text-sm leading-[26px] md:text-[15px] md:leading-[27px] lg:text-base lg:leading-[28px] mb-4 last:mb-0">
                      <p dir="ltr" className="mb-3 last:mb-0 empty:hidden">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel Navigation Buttons */}
          <div className="absolute top-1/2 z-10 flex h-0 w-full justify-between px-2 md:px-20 xl:px-60">
            <button className="swiper-button-prev-1 bg-[#205172] anim--linear group inline-flex items-center justify-center rounded-full leading-none -translate-x-[calc(50%)] -translate-y-1/2 !text-[var(--carousel-arrow-fill)] max-lg:max-h-[48px] max-lg:max-w-[48px] lg:-translate-x-[calc(50%+8px)] h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
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
            <button className="swiper-button-next-1 bg-[#205172] anim--linear group inline-flex items-center justify-center rounded-full leading-none -translate-y-1/2 translate-x-[calc(50%)] !text-[var(--carousel-arrow-fill)] max-lg:max-h-[48px] max-lg:max-w-[48px] lg:translate-x-[calc(50%+8px)] h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20">
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
      </div>

      {/* Clip Path SVG */}
      <svg
        width="0"
        height="0"
        viewBox="0 0 216 59"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="centered-carousel-clip-path">
            <path
              d="M215.901 0.480469H0.048111C11.9412 0.480469 24.3224 1.39099 34.9947 7.09659C46.1902 13.0822 52.9214 26.9087 66.7327 26.9087C76.1844 26.9087 79.8116 23.7934 86.9963 19.4879C92.7161 16.0225 99.7612 15.7425 106.039 17.6327C110.957 19.1029 115.7 22.1832 118.385 26.6287C120.966 30.8291 121.524 35.7996 123.198 40.3851C127.488 52.0764 138.265 58.9371 149.914 58.447C152.774 58.342 155.983 57.817 158.668 56.7669C166.586 53.6865 172.654 47.7009 175.653 39.6851C177.502 34.7845 178.165 29.534 179.908 24.5985C181.478 20.153 183.571 15.9525 186.5 12.2421C188.139 10.1769 190.127 8.32172 192.325 6.85157C194.801 5.17139 197.765 3.84125 200.625 3.07116C206.241 1.496 210.077 0.655487 215.901 0.480469Z"
              fill="white"
            ></path>
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};

export default ActivitiesCarousel;
