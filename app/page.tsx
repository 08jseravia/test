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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const emailContent = `
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
    `;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // Replace with the admin email
          subject: "New Subscription Form Submission",
          text: emailContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Reset form data
      setFormData({ name: "", email: "", phone: "" });

      // Show success message
      setSuccess(true);
      setIsPopupVisible(false); // Close the popup after submission
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Failed to send the message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      {/* Popup Form */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-end justify-center z-50 backdrop-blur-sm">
          <div className="p-0 md:p-6 rounded-t-lg w-full mx-auto transition-all duration-300 ease-in-out transform translate-y-4 justify-center flex">
            <div className="w-full lg:w-[40vw] text-white bg-black p-8 bg-opacity-70 rounded-lg ">
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
              <div className="flex flex-col space-y-3 justify-center mb-6">
                <h4
                  className="text-3xl font-bold text-center"
                  style={{ fontFamily: "Rubik" }}
                >
                  ¡Descubra el paraíso!
                </h4>
                <p
                  style={{ fontFamily: "Rubik" }}
                  className="text-sm md:text-lg"
                >
                  Suscríbase para estar al tanto de nuestras últimas
                  promociones, descuentos y beneficios especiales.
                </p>
              </div>

              {/* Form */}
              <form
                id="contact-form"
                className="grid grid-cols-1 gap-2"
                onSubmit={handleSubmit}
              >
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-heading block mb-2 font-medium"
                    style={{ fontFamily: "Rubik, sans-serif" }}
                  ></label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      placeholder="Nombre Completo"
                      className="text-black border border-gray-400 border-opacity-30 w-full rounded-md outline-none p-2 lg:p-3 pl-12 focus:ring-2 focus:ring-[#00beba] transition-all"
                      required
                      value={formData.name}
                      onChange={handleChange}
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
                  ></label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="Correo Electrónico"
                      className="text-black border border-gray-400 border-opacity-30 w-full rounded-md outline-none p-2 lg:p-3 pl-12 focus:ring-2 focus:ring-[#00beba] transition-all"
                      required
                      value={formData.email}
                      onChange={handleChange}
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
                  ></label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Número de Teléfono"
                      className="text-black border border-gray-400 border-opacity-30 w-full rounded-md outline-none p-2 lg:p-3 pl-12 focus:ring-2 focus:ring-[#00beba] transition-all"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <i className="flaticon-phone absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                <div className="flex space-x-4 mt-4">
                  <span>
                    <input type="checkbox" className="size-4" required />
                  </span>
                  <p
                    style={{ fontFamily: "Rubik" }}
                    className="text-sm md:text-lg"
                  >
                    Al registrarse, dejando su nombre, correo electrónico y
                    número de teléfono, usted acepta recibir comunicaciones y
                    promociones de Margaritaville Riviera Cancún. Además,
                    autoriza el uso de su información para contactarlo a través
                    de nuestras plataformas asociadas, conforme a nuestra
                    política de privacidad.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-[#00beba] rounded-md text-sm p-3 mt-4 w-[200px] text-white font-medium hover:bg-[#009c9a] transition-colors duration-200 disabled:opacity-50"
                  style={{ fontFamily: "Rubik, sans-serif" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                </button>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                {/* Success Message */}
                {success && (
                  <p className="text-green-500 text-sm mt-2">
                    ¡Gracias por suscribirse!
                  </p>
                )}
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
