// components/ExperienciasExtraordinarias.js
import React from "react";

const ExperienciasExtraordinarias = () => {
  return (
    <section className="accordion p-[50px_40px] mt-20 mb-20 bg-blue-50">
      <div className=" py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-5xl text-blue-900 mb-6"
            style={{ fontFamily: "GreatVibes" }}
          >
            Experiencias Extraordinarias Te Esperan
          </h2>
          <p
            className="text-lg text-gray-700 mb-8"
            style={{ fontFamily: "Rubik" }}
          >
            Escápate de tu rutina diaria y disfruta de una relajación total.
            Experimenta un entorno de resort incomparable con una vibra tropical
            única, libre de preocupaciones, y una sensación de escape desde el
            momento en que llegas. Relájate con un tratamiento de spa o disfruta
            de la comodidad de tu suite con acceso a la piscina. Anímate a
            probar algo nuevo en la cancha de pickleball o en una sesión de
            mezcla de margaritas. ¡Déjate llevar por la vibra de la isla!
          </p>

          <h3
            className="text-3xl sm:text-5xl text-blue-900 mt-10 mb-6"
            style={{ fontFamily: "GreatVibes" }}
          >
            Island Reserve Inclusive®
          </h3>
          <p
            className="text-lg text-gray-700 mb-8"
            style={{ fontFamily: "Rubik" }}
          >
            En los resorts Margaritaville Island Reserve, llevamos la
            experiencia &quot;todo incluido&quot; al siguiente nivel, ofreciendo
            una experiencia elevada impregnada del espíritu de aventura, escape
            y lujo relajado característico de Margaritaville. Disfruta de
            gastronomía global de cinco estrellas, servicio incomparable,
            amenities de lujo y mucho más. Nuestras vacaciones todo incluido
            incluyen:
          </p>

          <div className="flex flex-wrap justify-start gap-8 mb-8">
            <ul
              className="text-lg text-gray-700 list-disc list-inside text-left max-w-md"
              style={{ fontFamily: "Rubik" }}
            >
              <li>Alojamiento según selección</li>
              <li>Todas las comidas gourmet y snacks</li>
              <li>
                Todas las bebidas alcohólicas y no alcohólicas premium,
                nacionales y seleccionadas internacionales
              </li>
              <li>
                Suministros para bar en la habitación de Joe Merchant’s Coffee &
                Provisions
              </li>
            </ul>
            <ul
              className="text-lg text-gray-700 list-disc list-inside text-left max-w-md"
              style={{ fontFamily: "Rubik" }}
            >
              <li>Centro de fitness Fins Up!</li>
              <li>Internet inalámbrico de alta velocidad</li>
              <li>Servicio de habitación las 24 horas</li>
              <li>Servicios de planificación de vacaciones</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienciasExtraordinarias;
