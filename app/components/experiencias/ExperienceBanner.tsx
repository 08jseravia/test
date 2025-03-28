import Image from "next/image";
import Link from "next/link";

const ExperienceBanner = () => {
  return (
    <div className="w-screen">
      <div className="overflow-hidden group transition">
        <div className="swiper-wrapper">
          {/* Single Slider */}
          <div className="swiper-slide">
            <div className="before:content-[''] absolute h-[100%] w-[100%] before:bg-[#000834a6] before:h-[100%] before:w-[100%] before:inset-0 before:absolute">
              <Image
                className="h-[100%] w-[100%] object-cover"
                src="/assets/images/banner/banner.jpg"
                alt="ExperienceBanner"
                width={1920}
                height={1080}
              />
            </div>
            <div className="container mx-auto px-4 z-50 relative">
              <div className="xl:py-[210px] lg:py-[150px] md:py-[120px] py-[80px] relative text-center z-20 prose">
                <span
                  className="anim-1 text-white font-glida sm:text-sm md:text-xl"
                  style={{ fontFamily: "Rubik" }}
                >
                  Bienvenido a Margaritaville
                </span>
                <h1
                  style={{ fontFamily: "Rubik" }}
                  className="anim-2 text-white mt-[20px] mb-[30px] text-[40px] leading-[50px] md:text-[60px] md:leading-[70px] lg:text-[70px] lg:leading-[85px] xl:text-[80px] xl:leading-[90px]"
                >
                  Experiencia de Estancia de Lujo: Confort y Elegancia
                </h1>
                <Link
                  href="habitaciones"
                  className="anim-4 theme-btn fill btn-style !border-0 !py-[10px] rounded-[6px] p-4 text-white"
                  style={{ backgroundColor: "#00beba" }}
                >
                  Descubre las Habitaciones
                </Link>
              </div>
            </div>
          </div>
          {/* Single Slider End */}
        </div>
      </div>
    </div>
  );
};

export default ExperienceBanner;
