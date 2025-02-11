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
        <div className="fixed inset-0 flex items-end justify-center z-50">
          <div className="bg-black bg-opacity-70 p-[20px] rounded-t-[10px] w-full">
            <div className=" w-full lg:w-[40vw] text-white">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsPopupVisible(false)}
                  className="mt-[10px] text-sm text-white"
                >
                  X
                </button>
              </div>
              <div className="flex justify-center mb-4">
                <h4 className="text-2xl" style={{ fontFamily: "Rubik" }}>
                  ¡SÚMESE A LA LISTA!
                </h4>
              </div>
              <form
                id="contact-form"
                className="grid grid-cols-1 gap-[15px]"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="text-heading block mb-[10px]"
                    style={{ fontFamily: "Rubik" }}
                  >
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      placeholder="Nombre Completo"
                      className="border-[1px] border-[#65676B] border-opacity-30 w-full rounded-[4px] outline-none p-[13px_20px_13px_45px]"
                    />
                    <i className="flaticon-user absolute top-[30%] left-[15px]"></i>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-heading block mb-[10px]"
                    style={{ fontFamily: "Rubik" }}
                  >
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="Correo Electrónico"
                      className="border-[1px] border-[#65676B] border-opacity-30 w-full rounded-[4px] outline-none p-[13px_20px_13px_45px]"
                    />
                    <i className="flaticon-envelope absolute top-[32%] left-[15px]"></i>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-heading block mb-[10px]"
                    style={{ fontFamily: "Rubik" }}
                  >
                    Número de Teléfono
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Número de Teléfono"
                      className="border-[1px] border-[#65676B] border-opacity-30 w-full rounded-[4px] outline-none p-[13px_20px_13px_45px]"
                    />
                    <i className="flaticon-phone absolute top-[32%] left-[15px]"></i>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#00beba] rounded-[6px] !text-sm !p-[12px_35px] fill w-full text-white"
                  style={{ fontFamily: "Rubik" }}
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
