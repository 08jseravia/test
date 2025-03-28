import Image from "next/image";

const RestaurantMenu = () => {
  const menuItems = [
    { id: 1, name: "Platos pequeños", active: true },
    { id: 2, name: "Entradas frías" },
    { id: 3, name: "Vegetariano y vegano" },
    { id: 4, name: "Hamburguesas y sándwiches" },
    { id: 5, name: "Salsas y untables" },
    { id: 6, name: "Especialidades de mariscos" },
  ];

  const dishes = [
    {
      id: 1,
      name: "Pollo crujiente con hierbas toscanas",
      price: "$120",
      description: "Caramelo salado, hojaldre, ensalada",
      image: "1.jpg",
    },
    {
      id: 2,
      name: "Boloñesa clásica con ingredientes frescos",
      price: "$120",
      description: "Caramelo salado, hojaldre, ensalada",
      image: "2.jpg",
    },
    {
      id: 3,
      name: "Pollo crujiente con hierbas toscanas",
      price: "$120",
      description: "Carne picante, tocino, frijoles",
      image: "3.jpg",
    },
    {
      id: 4,
      name: "Boloñesa clásica con ingredientes frescos",
      price: "$120",
      description: "Salsa de queso azul, zanahoria, apio",
      image: "4.jpg",
    },
    {
      id: 5,
      name: "Pollo crujiente con hierbas toscanas",
      price: "$120",
      description: "Spalla Cotta, Mortadella, Culacciona",
      image: "5.jpg",
    },
    {
      id: 6,
      name: "Boloñesa clásica con ingredientes frescos",
      price: "$120",
      description: "Manzana, servido medio crudo, limas",
      image: "6.jpg",
    },
  ];

  return (
    <div className="relative bg-gray-100 py-[80px]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[30px] mb-[60px]">
          <div>
            <span className="text-primary text-lg font-semibold mb-[10px] block">
              Menú del Restaurante
            </span>
            <h2
              className="text-4xl sm:text-5xl  capitalize"
              style={{ fontFamily: "GreatVibes" }}
            >
              Menú del Restaurante
            </h2>
          </div>
          <div>
            <p className="text-sm max-w-[645px]">
              Experimenta el máximo lujo y relajación con nuestra oferta
              especial exclusiva. Reserva ahora y disfruta de un 20% de
              descuento en nuestras mejores tarifas disponibles.
            </p>
          </div>
        </div>

        {/* Menu Items Navigation */}
        {/* <div className="mb-[50px]">
          <ul className="flex flex-wrap lg:flex-nowrap gap-[15px] justify-start lg:justify-between">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`border border-gray-500 rounded-[6px] px-[22px] py-[15px] block leading-none transition-all hover:bg-primary hover:text-white hover:border-primary ${
                    item.active
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Dishes List */}
        <div className="tab-content">
          <div className="space-y-[20px]">
            {dishes.map((dish) => (
              <div key={dish.id}>
                <div className="flex gap-[20px] items-center">
                  <Image
                    className="rounded-[6px]"
                    height={78}
                    width={78}
                    src={`/assets/images/pages/resturant/${dish.image}`}
                    alt={dish.name}
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-[20px] lg:gap-[80px] items-center">
                      <a
                        href="#"
                        className="text-lg font-semibold text-gray-800"
                      >
                        {dish.name}
                      </a>
                      <span className="text-lg font-semibold text-gray-800">
                        {dish.price}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {dish.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
