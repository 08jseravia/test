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
              Disfruta de la máxima escapada con todo incluido solo para
              adultos, con servicio de cinco estrellas sin complicaciones.
              Experimenta Margaritaville Island Reserve Resort Riviera Maya, con
              la primera cervecería LandShark en la playa. Disfruta de
              gastronomía de cinco estrellas, servicio incomparable, comodidades
              de lujo, espectaculares shows y experiencias y actividades
              inolvidables. Y un montón de espacio para tomar el sol junto a la
              piscina con buena vibra isleña y una margarita en mano.
            </p>
          </div>

          {/* Image */}
          <div className="image md:mr-[85px] sm:mr-0 h-[100%] w-[100%] sm:h-auto sm:w-auto">
            <div className="relative wow fadeInUp">
              <div className="jara-mask-1 jarallax sm:min-h-[580px] sm:min-w-[485px]">
                <Image
                  src="/assets/images/about/about-1.webp"
                  alt="About Image"
                  className="jarallax-img"
                  width={485}
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
