import Link from "next/link";
import React from "react";

const FacilitySection = () => {
  return (
    <div className="relative bg-[#f1f1f1] py-[80px] lg:py-[120px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-[40px]">
          <span
            style={{ color: "#00beba" }}
            className="subtitle font-glida text-lg font-semibold text-primary"
          >
            Instalaciones
          </span>
          <h2
            className="text-4xl sm:text-5xl mt-[15px] "
            style={{ fontFamily: "GreatVibes" }}
          >
            Instalaciones del Hotel
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px]">
          <div className="py-[40px] px-[30px] text-center transition-all bg-white rounded-[6px] hover:shadow-lg">
            <img
              src="/assets/images/icon/bed.svg"
              alt="icon"
              className="mx-auto mb-[25px]"
            />
            <p className="text-lg font-semibold text-heading mb-[15px] block">
              Habitaciones y Suites
            </p>
            <p className="text-gray-600 text-center">
              Tipos variados de habitaciones, desde estándar hasta suites de
              lujo, equipadas con elementos esenciales como camas.
            </p>
          </div>
          <div className="py-[40px] px-[30px] text-center transition-all bg-white rounded-[6px] hover:shadow-lg">
            <img
              src="/assets/images/icon/security.svg"
              alt="icon"
              className="mx-auto mb-[25px]"
            />
            <p className="text-lg font-semibold text-heading mb-[15px] block">
              Seguridad las 24 Horas
            </p>
            <p className="text-gray-600 text-center">
              Personal de seguridad en el lugar y la mejor vigilancia. Desde
              habitaciones estándar hasta suites de lujo, seguras para objetos
              de valor.
            </p>
          </div>
          <div className="py-[40px] px-[30px] text-center transition-all bg-white rounded-[6px] hover:shadow-lg">
            <img
              src="/assets/images/icon/gym.svg"
              alt="icon"
              className="mx-auto mb-[25px]"
            />
            <p className="text-lg font-semibold text-heading mb-[15px] block">
              Restaurantes y bar
            </p>
            <p className="text-gray-600 text-center">
              Disfruta de una experiencia gastronómica única en nuestros
              restaurantes y relájate en el bar con una amplia selección de
              bebidas.
            </p>
          </div>
          <div className="py-[40px] px-[30px] text-center transition-all bg-white rounded-[6px] hover:shadow-lg">
            <img
              src="/assets/images/icon/spa.svg"
              alt="icon"
              className="mx-auto mb-[25px]"
            />
            <p className="text-lg font-semibold text-heading mb-[15px] block">
              Spa
            </p>
            <p className="text-gray-600 text-center">
              Escapa a nuestro spa para una relajación y rejuvenecimiento total.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center mt-10">
        <Link
          href="experiencias"
          className="anim-4 theme-btn fill btn-style !border-0 !py-[10px] rounded-[6px] p-4 text-white"
          style={{ backgroundColor: "#00beba" }}
        >
          Explorar Experiencias
        </Link>
      </div>
    </div>
  );
};

export default FacilitySection;
