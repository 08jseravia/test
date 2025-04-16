import Image from "next/image";

const services = [
  {
    image: "/assets/images/services/1.webp",
    tag: "Spa y Bienestar",
    title: "Spa y Bienestar",
    description:
      "En nuestros Servicios de Fitness y Yoga, estamos dedicados a ayudarte a alcanzar tus metas de salud y bienestar. Nuestro programa integral ofrece una variedad de clases diseñadas para adaptarse a todos los niveles.",
  },
  {
    image: "/assets/images/services/2.webp",
    tag: "Escapada Romántica",
    title: "Escapada Romántica",
    description:
      "En nuestros Servicios de Fitness y Yoga, estamos dedicados a ayudarte a alcanzar tus metas de salud y bienestar. Nuestro programa integral ofrece una variedad de clases diseñadas para adaptarse a todos los niveles.",
  },
  {
    image: "/assets/images/services/wedding.webp",
    tag: "Servicios de Bodas",
    title: "Servicios de Bodas",
    description:
      "Haz de tu día especial algo inolvidable con nuestros servicios de planificación y organización de bodas. Ofrecemos paquetes personalizados para satisfacer tus necesidades.",
  },
];

const NuestroServicio = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-30">
          <h2
            className="text-4xl sm:text-5xl mt-2"
            style={{ fontFamily: "GreatVibes" }}
          >
            Nuestro Servicios
          </h2>
        </div>

        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-8 ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            } my-12`}
          >
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[4/3] lg:aspect-video">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2
                className="text-4xl sm:text-5xl mt-2 mb-4"
                style={{ fontFamily: "GreatVibes" }}
              >
                {service.title}
              </h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NuestroServicio;
