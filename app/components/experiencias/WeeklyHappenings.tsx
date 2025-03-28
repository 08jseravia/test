"use client";

import IconDescription from "./IconDescrition";

export default function WeekleyHappening() {
  const iconListing = [
    {
      href: "/assets/images/experienceIcons/mic.svg",
      description: "Música en Vivo y Entretenimiento Diario",
    },
    {
      href: "/assets/images/experienceIcons/music.svg",
      description: "Fiestas en la Piscina con Bandas Locales y DJs",
    },
    {
      href: "/assets/images/experienceIcons/fire.svg",
      description: "Fogatas Nocturnas",
    },
    {
      href: "/assets/images/experienceIcons/ball.svg",
      description: "Deportes y Juegos",
    },
    {
      href: "/assets/images/experienceIcons/pickleball.svg",
      description: "Pickleball y Cornhole",
    },
    {
      href: "/assets/images/experienceIcons/martini.svg",
      description: "Preparación (¡y Degustación!) de Margaritas",
    },
  ];
  return (
    <div className="relative text-center">
      <h3
        className="text-4xl sm:text-5xl text-blue-900 mt-10 mb-6"
        style={{ fontFamily: "GreatVibes" }}
      >
        Acontecimientos Semanales
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-20 ">
        {iconListing.map(({ href, description }, index) => (
          <IconDescription
            key={`ex-${index}`}
            href={href}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}
