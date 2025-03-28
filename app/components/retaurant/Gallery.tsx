import Image from "next/image";

const Gallery = () => {
  return (
    <div className="relative pb-[100px] lg:pb-[120px]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-[45px]">
          <span className="text-primary text-lg font-semibold">
            Restaurante
          </span>
          <h2
            className="text-4xl sm:text-5xl  mt-[15px] mb-[15px]"
            style={{ fontFamily: "GreatVibes" }}
          >
            Nuestra Galería del Restaurante
          </h2>
          <p className="max-w-[645px] mx-auto text-gray-600">
            Nuestras habitaciones ofrecen una mezcla armoniosa de comodidad y
            elegancia, diseñadas para brindar una estancia excepcional a cada
            huésped. Cada habitación cuenta con ropa de cama de lujo.
          </p>
        </div>

        {/* Gallery Section */}
        <div className="flex gallery justify-center">
          <div className="flex flex-col gap-[30px]">
            {/* First Row of Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item}>
                  <a href={`/assets/images/pages/gallery/${item}.webp`}>
                    <Image
                      className="rounded-[6px]  h-auto"
                      src={`/assets/images/pages/resturant/gallery/${item}.webp`}
                      alt="Galería"
                      width={400}
                      height={300}
                      style={{ width: 400, height: 300 }}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
