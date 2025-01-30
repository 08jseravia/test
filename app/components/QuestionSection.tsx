"use client";
import { useState } from "react";

const QuestionSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      question:
        "¿Hay promociones o descuentos especiales disponibles para los huéspedes?",
      answer:
        "En Margaritaville Island Reserve, ofrecemos diversas promociones y descuentos especiales para nuestros huéspedes. Para más información, visite nuestra página de promociones o consulte con nuestro equipo de reservas.",
    },
    {
      question:
        "¿Todas las propiedades de Margaritaville son resorts con todo incluido?",
      answer:
        "Sí, todos nuestros resorts en la marca Margaritaville Island Reserve son resorts todo incluido, que ofrecen comidas, bebidas y actividades dentro del paquete. Disfruta de una experiencia sin preocupaciones.",
    },
    {
      question:
        "¿Cuál resort de Margaritaville Island Reserve es solo para adultos?",
      answer:
        "El resort Margaritaville Island Reserve Riviera Maya es un establecimiento solo para adultos, diseñado para ofrecer una experiencia tranquila y exclusiva para parejas y adultos.",
    },
    {
      question:
        "¿Puedo hacer solicitudes especiales antes de llegar a Margaritaville Island Reserve via la App?",
      answer:
        "Sí, a través de nuestra aplicación, puedes hacer solicitudes especiales como preferencias de habitación, necesidades dietéticas, o servicios adicionales. Nuestro equipo hará lo posible por satisfacer tus solicitudes antes de tu llegada.",
    },
    {
      question:
        "¿Puedo reservar una habitación con piscina privada en Margaritaville?",
      answer:
        "Algunas de nuestras propiedades ofrecen habitaciones con piscina privada. Te recomendamos que consultes las opciones disponibles al realizar tu reserva para asegurar la disponibilidad de este tipo de habitación.",
    },
    {
      question:
        "¿Cuál es la edad mínima para ingresar a Margaritaville Island Reserve Riviera Maya?",
      answer:
        "La edad mínima para ingresar al Margaritaville Island Reserve Riviera Maya es de 18 años. Los menores de 18 años no están permitidos en este resort.",
    },
  ];

  return (
    <div className="accordion p-[50px_40px] mt-20 mb-20">
      <h6 className="mb-4 text-2xl lg:text-3xl" style={{ fontFamily: "Rubik" }}>
        Preguntas
      </h6>
      {accordionData.map((item, index) => (
        <div key={index} className="accordion-item border-b">
          <button
            className="accordion-button w-full text-left py-4 flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <svg
              className={`accordion-icon w-4 h-4 transform transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4 6l4 4 4-4z" />
            </svg>
          </button>
          <div
            className={`mx-10 p-2 accordion-content overflow-hidden transition-max-height duration-300 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <p className="py-10">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionSection;
