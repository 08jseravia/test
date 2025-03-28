import Image from "next/image";

const services = [
  {
    icon: "/assets/images/icon/security.svg",
    title: "Seguridad 24 Horas",
    description:
      "Un servicio de seguridad las 24 horas brinda vigilancia y protección para propiedades e información confidencial durante todo el día.",
  },
  {
    icon: "/assets/images/icon/wifi.svg",
    title: "Wifi Gratis",
    description:
      "El Wi-Fi gratis se ha convertido en un servicio esencial en nuestro mundo cada vez más conectado.",
  },
  {
    icon: "/assets/images/icon/gym.svg",
    title: "Centro de Fitness",
    description:
      "Un centro de fitness es un entorno vibrante y dinámico diseñado para promover la salud y el bienestar.",
  },
  {
    icon: "/assets/images/icon/aeroplane.svg",
    title: "Transporte al Aeropuerto",
    description:
      "El transporte al aeropuerto juega un papel crucial en la experiencia de viaje de los pasajeros.",
  },
  {
    icon: "/assets/images/icon/desk.svg",
    title: "Escritorio de Trabajo",
    description:
      "Un escritorio de trabajo bien organizado es más que un lugar para completar tareas; es un centro de productividad y creatividad.",
  },
  {
    icon: "/assets/images/icon/swimming-pool.svg",
    title: "Piscina",
    description:
      "Una piscina es un oasis refrescante que ofrece un lugar para refrescarse, relajarse y disfrutar de diversas actividades acuáticas.",
  },
  {
    icon: "/assets/images/icon/bed.svg",
    title: "Habitaciones y Suites",
    description:
      "Desde suites estándar hasta de lujo, ofrecemos almacenamiento seguro para objetos de valor y personal de seguridad en el lugar.",
  },
  {
    icon: "/assets/images/icon/shower.svg",
    title: "Ducha",
    description:
      "El agua caliente cae en cascada, envolviéndote en una sensación relajante mientras te paras en la ducha.",
  },
];

const SeccionServicios = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center max-w-[350px] mx-auto">
              <Image
                src={service.icon}
                alt={service.title}
                width={40}
                height={40}
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeccionServicios;
