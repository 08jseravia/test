import Image from "next/image";

const AboutSection = () => {
  return (
    <div className="relative is__home__one py-[80px] lg:py-[120px]">
      {/* Section Shape (if needed) */}
      <div className="section__shape"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-[40px] lg:gap-[30px]">
          {/* Content */}
          <div className="content prose">
            <h2
              className="mb-[30px] text-4xl sm:text-5xl "
              style={{ fontFamily: "GreatVibes" }}
            >
              La máxima escapada solo para adultos
            </h2>
            <p className="text-sm max-w-[645px] mb-[45px]">
              Descubre el equilibrio perfecto entre lujo y relajación en
              Margaritaville Island Reserve Riviera Maya, un exclusivo resort
              todo incluido diseñado para disfrutar sin preocupaciones. Disfruta
              de una experiencia de cinco estrellas con gastronomía excepcional,
              servicio inigualable y comodidades de primer nivel. Sumérgete en
              la esencia isleña con la primera cervecería LandShark en la playa,
              espectaculares shows en vivo y experiencias únicas pensadas para
              hacer de cada momento algo inolvidable. Relájate junto a la
              piscina con una margarita en mano o explora las maravillas del
              Caribe en un entorno que redefine el concepto de escapada
              perfecta.
            </p>
          </div>

          {/* Image */}
          <div className="image md:mr-[85px] sm:mr-0 h-[100%] w-[100%] sm:h-auto sm:w-auto">
            <div className="relative wow fadeInUp">
              <div className="jara-mask-1 jarallax sm:min-h-[580px] sm:min-w-[485px]">
                <Image
                  src="/assets/images/about/about-1.jpg"
                  alt="About Image"
                  className="jarallax-img"
                  width={1000}
                  height={580}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
