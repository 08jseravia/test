"use client";
import Image from "next/image";
import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
            <div className="px-4">
              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-6xl mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-[6px] shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer flex justify-center"
                    onClick={() => setSelectedImage(item)}
                  >
                    <Image
                      className="rounded-[6px] object-cover transition-transform duration-700 group-hover:scale-110"
                      src={`/assets/images/pages/resturant/gallery/${item}.webp`}
                      alt={`Gallery image ${item}`}
                      width={400}
                      height={300}
                      style={{ width: "100%", height: "300px" }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-75 group-hover:scale-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Image Modal */}
              {selectedImage && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="relative max-w-6xl max-h-screen">
                    <button
                      className="absolute -top-10 md:-top-8 right-0 md:right-0 text-white text-3xl hover:text-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                    >
                      &times;
                    </button>
                    <Image
                      className="max-h-[90vh] max-w-full object-contain"
                      src={`/assets/images/pages/resturant/gallery/${selectedImage}.webp`}
                      alt={`Enlarged gallery image ${selectedImage}`}
                      width={1200}
                      height={800}
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
