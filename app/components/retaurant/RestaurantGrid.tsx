"use client";
import Image from "next/image";
import { useState } from "react";

const RestaurantCard = ({
  restaurant,
}: {
  restaurant: {
    id: number;
    name: string;
    alt: string;
    imageUrl: string;
    hours: string[];
    description: string;
    category: string;
  };
}) => {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="relative">
        <div className="relative aspect-[10/11] w-full">
          <Image
            alt={restaurant.alt}
            fill
            className="object-cover object-center"
            src={restaurant.imageUrl}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 30vw"
            quality={75}
          />
        </div>
      </div>
      <div className="flex flex-grow flex-col justify-between px-4">
        <div>
          <h3
            className="text-3xl sm:text-4xl mt-[15px] "
            style={{ fontFamily: "GreatVibes" }}
          >
            {restaurant.name}
          </h3>
          <div>
            <div className="text-xs leading-[22px] lg:text-sm lg:leading-[24px] mt-2 font-bold uppercase ![color:var(--restaurant-card-subtitle-color)] ![font-size:var(--restaurant-card-subtitle-font-size)] ![font-weight:var(--restaurant-card-subtitle-font-weight)] ![text-transform:var(--restaurant-card-subtitle-transform)] ![letter-spacing:var(--restaurant-card-subtitle-letter-spacing,0.48)]">
              {restaurant.hours.map((hour, index) => (
                <p
                  key={index}
                  className="mb-3 last:mb-0 empty:hidden"
                  style={{ fontFamily: "Rubik" }}
                >
                  {hour}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p
              className="mb-3 last:mb-0 empty:hidden"
              style={{ fontFamily: "Rubik" }}
            >
              {restaurant.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RestaurantGrid = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "bars", label: "Bares" },
    { id: "coffee", label: "Coffee & Provisions" },
    { id: "restaurants", label: "Restaurantes" },
    { id: "all", label: "Mostrar todo" },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Bar Acuático SOS (Varado en la Arena)",
      alt: "swim up bar",
      imageUrl: "/assets/restaurants/1.webp",
      hours: ["Servicio de bar de 11:00 AM - 5:00 PM"],
      description:
        "Camina o vadea desde una de nuestras suites de piscina y disfruta de refrescantes bebidas en la piscina o junto a ella, con una amplia selección de opciones de bebidas alcohólicas y no alcohólicas.",
      category: "bars",
    },
    {
      id: 2,
      name: "5 o'Clock Somewhere Bar y Swim-up Bar",
      alt: "swim up bar",
      imageUrl: "/assets/restaurants/2.webp",
      hours: [
        "Bar acuático abierto de 10:00 AM a 7:00 PM",
        "Servicio de Bar de 10:00 AM - 7:00 PM",
      ],
      description:
        "Como dice la canción, son las 5 en alguna parte, un elemento básico de cualquier experiencia Margaritaville. Relájate junto a la piscina, en la piscina o en los columpios del bar, y saborea cócteles, una cerveza fría o vino espumoso y, por supuesto, las mundialmente famosas margaritas de Margaritaville.",
      category: "bars",
    },
    {
      id: 3,
      name: "License to Chill Bar, Wet Feet Bar & Beachside Grill",
      alt: "outdoor restaurant",
      imageUrl: "/assets/restaurants/3.webp",
      hours: ["Abierto a diario de 11:00 AM a 5:00 PM"],
      description:
        '"Licencia de relax, y creo que lo haré". Disfruta de la brisa marina, saborea un cóctel recién hecho y come algo ligero. Refréscate mientras tomas el sol en nuestro bar Wet Feet, con mesas en aguas poco profundas, donde disfrutarás de otra experiencia única de Margaritaville.',
      category: "bars",
    },
    {
      id: 4,
      name: "Salted Rim",
      alt: "restaurant",
      imageUrl: "/assets/restaurants/4.webp",
      hours: ["Servicio de bar de 12:00 PM a 11:00 PM"],
      description:
        'Tequila, margarita y "con su sal y su limón"... de eso se trata. Con elegancia caribeña con un excepcional servicio. Elige entre la amplia selección de auténticos tequilas, mezcales y bacanoras para crear tu margarita favorita, o pide a nuestros mixólogos que muestren sus habilidades y creen un cóctel nuevo y emocionante.',
      category: "bars",
    },
    {
      id: 5,
      name: "Joe Merchant's Coffee & Provisions",
      alt: "Coffe and provisions shop",
      imageUrl: "/assets/restaurants/5.webp",
      hours: ["Abierto a diario de 7:00 AM a 11:00 PM"],
      description:
        "Nuestro sistema de puntos es fácil de usar y te permite personalizar tu experiencia en la habitación según tus preferencias. Joe Merchant's Coffee & Provisions es también el lugar ideal para tomar un café mexicano recién hecho mientras examinas nuestra variada selección de productos. Haz que lleven tu pedido personalizado a tu habitación por un cargo adicional.",
      category: "coffee",
    },
    {
      id: 6,
      name: "Frank & Lola's Trattoria Italiana",
      alt: "restaurant",
      imageUrl: "/assets/restaurants/6.webp",
      hours: ["Cena de 5:30 PM a 10:00 PM"],
      description:
        "Sirve platos italianos artesanales, auténticos y exquisitamente preparados. Desde mariscos locales hasta jamón de Parma, disfruta de lo máximo en comida italiana. El menú incluye una fresca selección de antipastos, pastas y pizzas hechas en horno de leña.",
      category: "restaurants",
    },
    {
      id: 7,
      name: "JWB Steakhouse",
      alt: "JWB Steakhouse Restaurants And Bars Margaritaville Riviera Maya",
      imageUrl: "/assets/restaurants/7.webp",
      hours: ["Cena de 6:00 PM a 10:00 PM"],
      description:
        'Más que una experiencia gastronómica, cenar en JWB Steakhouse es algo realmente único. Deja que nuestro "Sumiller de Carnes" te explique todo lo que necesitas saber sobre los delicados cortes de carne de crianza especial. Elige el corte y el tamaño, y deja que nuestros chefs hagan su magia.',
      category: "restaurants",
    },
    {
      id: 8,
      name: "LandShark Brewery & Grill",
      alt: "restaurant",
      imageUrl: "/assets/restaurants/8.webp",
      hours: [
        "Almuerzo de 11:30 AM a 5:00 PM",
        "Cena de 5:00 PM a 10:00 PM",
        "Bar y DJ: 10:00 PM a 1:00 AM",
      ],
      description:
        "Con dos terrazas, éste es el lugar ideal para disfrutar de una cerveza rubia LandShark (elaborada in situ) o de una de nuestras suculentas especialidades a la parrilla. Saluda a nuestro maestro cervecero, disfruta de una cata de cervezas o ven por la noche a disfrutar de shows y de un menú combinado con cervezas.",
      category: "restaurants",
    },
    {
      id: 9,
      name: "The Boat House",
      alt: "restaurant with a boat on the ceiling",
      imageUrl: "/assets/restaurants/9.webp",
      hours: [
        "Desayuno de 7:00 AM a 11:00 AM",
        "Almuerzo de 01:00 PM a 03:00 PM",
      ],
      description:
        "Gastronomía de primera clase en un ambiente informal pero chic y sofisticado, con amplio espacio interior y exterior. Deléitate con sabrosos platos de la cocina internacional, servidos en múltiples estaciones y cocinados a la orden. Situado en la plaza de la planta baja.",
      category: "restaurants",
    },
  ];

  const filteredRestaurants =
    activeFilter === "all"
      ? restaurants
      : restaurants.filter(
          (restaurant) => restaurant.category === activeFilter
        );

  return (
    <div className="c-container px-6 md:px-8 lg:px-12 2xl:px-20 mx-auto max-w-screen-4xl my-10 lg:my-20">
      <div className="mb-8 xl:mb-16">
        <div className="flex flex-wrap gap-5 py-4 xl:justify-center">
          <div className="flex flex-wrap gap-5">
            {filters.slice(0, 3).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                <p
                  className={`text-[17px] leading-[27px] md:text-[19px] md:leading-[29px] lg:text-[21px] lg:leading-[31px] relative py-1 font-[var(--room-grid-filter-font-weight)] uppercase text-[var(--room-grid-filter-color)] xl:px-4 xl:py-2 ${
                    activeFilter === filter.id
                      ? "after:absolute after:left-0 after:top-full after:block after:h-1 after:w-full after:bg-black"
                      : ""
                  }`}
                >
                  <span>{filter.label}</span>
                </p>
              </button>
            ))}
          </div>
          <button onClick={() => setActiveFilter("all")}>
            <p
              className={`text-[17px] leading-[27px] md:text-[19px] md:leading-[29px] lg:text-[21px] lg:leading-[31px] relative py-1 font-[var(--room-grid-filter-font-weight)] uppercase text-[var(--room-grid-filter-color)] xl:px-4 xl:py-2 ${
                activeFilter === "all"
                  ? "after:absolute after:left-0 after:top-full after:block after:h-1 after:w-full after:bg-black"
                  : ""
              }`}
            >
              <span>Mostrar todo</span>
            </p>
          </button>
        </div>
      </div>
      <div className="grid gap-x-4 gap-y-20 lg:grid-cols-2 xl:grid-cols-3">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} style={{ opacity: 1, transform: "none" }}>
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantGrid;
