import Image from "next/image";

const HotelExperience = () => {
  return (
    <div className="relative py-[100px] lg:py-[120px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-[30px] xl:flex-row xl:gap-[80px]">
          {/* Image Section */}
          <div className="flex flex-wrap lg:flex-nowrap">
            <Image
              className="rounded-[10px] h-[550px]"
              height={648}
              width={1000}
              src="/assets/images/pages/resturant/004.jpg"
              alt="Imagen de la experiencia del hotel 1"
            />
          </div>

          {/* Content Section */}
          <div className="max-w-[700px]">
            <span className="relative mb-[15px] inline-block text-primary text-lg font-semibold">
              Experiencia en el Hotel
            </span>
            <h2
              className="text-4xl sm:text-5xl  mb-[20px]"
              style={{ fontFamily: "GreatVibes" }}
            >
              Del campo a la mesa: disfruta de platos frescos y de temporada en
              Bokinn
            </h2>
            <p className="text-sm max-w-[645px]">
              Bienvenido a Margaritaville, nos hemos dedicado a ofrecer una
              estancia excepcional a nuestros huéspedes, combinando comodidades
              modernas con una elegancia atemporal. Nuestras habitaciones y
              suites, bellamente diseñadas, ofrecen vistas impresionantes y
              alojamientos lujosos, garantizando un retiro relajante, ya sea que
              estés aquí por negocios o placer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelExperience;
