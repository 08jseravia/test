import Image from "next/image";

const CulinaryExperience = () => {
  return (
    <section className="py-8 lg:py-16 delay-100 duration-1000 opacity-100 transition-all translate-y-0">
      <div className="c-container px-6 md:px-8 lg:px-12 2xl:px-20 mx-auto">
        <div className="lg:flex lg:gap-12 2xl:gap-20">
          {/* Image Section */}
          <div className="relative mb-8 aspect-[17/15] md:mb-9 lg:mb-0 lg:order-2 lg:w-[60%]">
            <Image
              alt="Taco Bar in a pool"
              loading="lazy"
              decoding="async"
              fill
              className="object-cover"
              sizes="100vw"
              src="/assets/experiences/1.webp"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
            />
          </div>

          {/* Text Content Section */}
          <div className="mb-4 lg:mb-0 lg:order-1 lg:w-[40%] 2xl:pl-32 self-center">
            <h3
              className="text-[36px] leading-tight md:text-[44px] lg:text-[48px] bg-clip-text font-alt bg-[url:var(--headings-bg-image)] mb-6 last:mb-0 text-blue-900"
              style={{ fontFamily: "GreatVibes" }}
            >
              Barco de aguacate
            </h3>
            <div className="text-base leading-[34px] md:text-[17px] md:leading-[37px] lg:text-lg lg:leading-[38px]">
              <p
                className="mb-3 last:mb-0 empty:hidden"
                style={{ fontFamily: "Rubik" }}
              >
                ¡Disfruta de una aventura culinaria única en el agua! Nuestro
                barco flotante de aguacate te trae la fiesta, sirviendo
                deliciosos tacos y refrescantes margaritas mientras tomas el sol
                y disfrutas de impresionantes vistas. Únase a nosotros para
                disfrutar de una sensación de sabor como ninguna otra y mejorar
                su experiencia en Margaritaville. Experiencia culinaria
                disfrutada con un costo adicional.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-4 md:flex-row lg:flex-wrap">
              {/* Add buttons or additional content here if needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulinaryExperience;
