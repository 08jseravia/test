"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import AboutSection from "./components/AboutSection";
import FacilitySection from "./components/FacilitySection";
import RoomSlider from "./components/RoomSection";
import { FormEvent, useState } from "react";

export default function Home() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
    setIsPopupVisible(false); // Close the popup after submission
  };
  return (
    <>
      <Header />
      {/* Popup Form remove popup form*/}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-end justify-center z-50 backdrop-blur-sm">
          <div className="bg-black bg-opacity-80 p-6 rounded-t-lg w-full mx-auto transition-all duration-300 ease-in-out transform translate-y-0 justify-center flex">
            <div className="w-full lg:w-[40vw] text-white">
              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsPopupVisible(false)}
                  className="mt-2 text-lg text-white hover:text-gray-300 transition-colors duration-200"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              {/* Heading */}
              <div className="flex justify-center mb-6">
                <h4
                  className="text-3xl font-bold"
                  style={{ fontFamily: "Rubik, sans-serif" }}
                >
                  ¡SÚMESE A LA LISTA!
                </h4>
              </div>

              {/* Form */}
              <form
                id="contact-form"
                className="grid grid-cols-1 gap-5"
                onSubmit={handleSubmit}
              >
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-heading block mb-2 font-medium"
                    style={{ fontFamily: "Rubik, sans-serif" }}
                  >
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      placeholder="Nombre Completo"
                      className="border border-gray-400 border-opacity-30 w-full rounded-md outline-none p-3 pl-12 focus:ring-2 focus:ring-[#00beba] transition-all"
                      required
                    />
                    <i className="flaticon-user absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-heading block mb-2 font-medium"
                    style={{ fontFamily: "Rubik, sans-serif" }}
                  >
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="Correo Electrónico"
                      className="border border-gray-400 border-opacity-30 w-full rounded-md outline-none p-3 pl-12 focus:ring-2 focus:ring-[#00beba] transition-all"
                      required
                    />
                    <i className="flaticon-envelope absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="text-heading block mb-2 font-medium"
                    style={{ fontFamily: "Rubik, sans-serif" }}
                  >
                    Número de Teléfono
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Número de Teléfono"
                      className="border border-gray-400 border-opacity-30 w-full rounded-md outline-none p-3 pl-12 focus:ring-2 focus:ring-[#00beba] transition-all"
                      required
                    />
                    <i className="flaticon-phone absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-[#00beba] rounded-md text-sm p-3 w-full text-white font-medium hover:bg-[#009c9a] transition-colors duration-200"
                  style={{ fontFamily: "Rubik, sans-serif" }}
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Banner />
      <AboutSection />
      <FacilitySection />
      <RoomSlider />
      <Footer />
    </>
  );
}
