"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import AboutSection from "./components/AboutSection";
import FacilitySection from "./components/FacilitySection";
import RoomSlider from "./components/RoomSection";
import { FormEvent, useState } from "react";
import PropertyDetails from "./components/PropertyDetails";

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
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Formulario de Contacto</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #205172;
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
                  color: #333333;
              }
              .content p {
                  margin: 10px 0;
                  line-height: 1.6;
              }
              .footer {
                  background-color: #00beba;
                  color: #ffffff;
                  text-align: center;
                  padding: 10px;
                  font-size: 14px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Nuevo Mensaje de Contacto</h1>
              </div>
              <div class="content">
                  <p><strong>Nombre:</strong> ${formData.name}</p>
                  <p><strong>Correo electrónico:</strong> ${formData.email}</p>
                  <p><strong>Teléfono:</strong> ${formData.phone}</p>
              </div>
              <div class="footer">
                  <p>Gracias por contactarnos. ¡Nos pondremos en contacto contigo pronto!</p>
              </div>
          </div>
      </body>
      </html>
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
          html: emailContent,
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
                      minLength={10}
                      maxLength={13}
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
                    promociones de Margaritaville Hotels and Resorts. Además,
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
      <PropertyDetails />
      <Footer />
    </>
  );
}
