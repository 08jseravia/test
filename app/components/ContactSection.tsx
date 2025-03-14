"use client";
import React, { FormEvent, useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    msg: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
          <title>Nuevo Mensaje de Contacto</title>
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
                  <p><strong>Mensaje:</strong> ${formData.msg}</p>
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
          subject: "Nuevo envío del formulario de contacto",
          html: emailContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Reset form data
      setFormData({
        name: "",
        email: "",
        msg: "",
      });

      // Show success message
      setSuccess(true);
    } catch (error) {
      setError(
        "No se pudo enviar el mensaje. Por favor, inténtelo de nuevo más tarde."
      );
      alert(
        "No se pudo enviar el mensaje. Por favor, inténtelo de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative pb-[80px] lg:pb-[120px] mt-[40px]">
      {/* Hero Section */}
      <div
        className="relative h-[400px] lg:h-[700px] bg-black bg-opacity-45 bg-cover bg-center justify-center bg-no-repeat flex items-center before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black before:opacity-60"
        style={{
          backgroundImage: "url(/assets/images/contact_banner.webp)",
        }}
      >
        <div className="container text-center text-white relative">
          <h1 className="heading text-white mb-[20px] text-[40px] lg:text-[70px] md:text-[60px] sm:text-[50px] leading-none">
            Contáctenos
          </h1>
          <p className="text-sm">
            Ya sea que tenga preguntas, necesite ayuda o simplemente quiera
            compartir.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] items-center">
          {/* Contact Form */}
          <div className="relative p-[80px_0] lg:p-[120px_0]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 gap-[30px] items-center">
                <div className="contact-form" style={{ marginTop: "-40px" }}>
                  <h4
                    className="heading text-3xl mb-[15px] max-w-[395px] text-center mx-auto"
                    style={{ fontFamily: "Rubik" }}
                  >
                    ¡Nos encantaría saber de usted! ¡Póngase en contacto!
                  </h4>
                  <form
                    id="contact-form"
                    className="grid grid-cols-1 gap-[15px]"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="text-heading block mb-[10px]"
                      >
                        Nombre Completo
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          placeholder="Nombre Completo"
                          className="border-[1px] border-[#65676B] border-opacity-30 w-full rounded-[4px] outline-none p-[13px_20px_13px_45px]"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <i className="flaticon-user absolute top-[30%] left-[15px]"></i>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-heading block mb-[10px]"
                      >
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          placeholder="Correo Electrónico"
                          className="border-[1px] border-[#65676B] border-opacity-30 w-full rounded-[4px] outline-none p-[13px_20px_13px_45px]"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <i className="flaticon-envelope absolute top-[32%] left-[15px]"></i>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="msg"
                        className="text-heading block mb-[10px]"
                      >
                        Mensaje
                      </label>
                      <div className="relative">
                        <textarea
                          id="msg"
                          className="border-[1px] border-[#65676B] border-opacity-30 w-full rounded-[4px] outline-none p-[14px_20px_14px_45px] resize-none h-[100px]"
                          placeholder="Mensaje"
                          value={formData.msg}
                          onChange={handleChange}
                          required
                        ></textarea>
                        <img
                          src="/assets/images/icon/message.svg"
                          className="absolute top-[20%] left-[15px]"
                          width="20"
                          height="20"
                          alt="Message Icon"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#00beba] rounded-[6px] !text-sm !p-[12px_35px] fill w-full text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Enviando..." : "Enviar Mensaje"}
                    </button>

                    {/* Error Message */}
                    {error && (
                      <p className="text-red-500 text-sm text-center mt-4">
                        {error}
                      </p>
                    )}

                    {/* Success Message */}
                    {success && (
                      <p className="text-green-500 text-sm text-center mt-4">
                        ¡Gracias por contactarnos! Nos pondremos en contacto
                        contigo pronto.
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* End Contact Form */}

          {/* Map */}
          <div className="map max-w-[600px] rounded-[6px] overflow-hidden h-[350px] lg:h-[500px]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4421.377185760186!2d-86.85737292416115!3d20.898152992250456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e874cc983d8af%3A0x47ed01bb620ec243!2sMargaritaville%20Island%20Reserve%20Riviera%20Maya!5e1!3m2!1sen!2sbz!4v1734943841779!5m2!1sen!2sbz"
              title="Hotel Location"
              allowFullScreen
            ></iframe>
          </div>
          {/* End Map */}

          {/* Contact Info */}
          <div
            className="contact flex flex-col gap-[30px] lg:gap-[40px]"
            style={{ fontFamily: "Rubik" }}
          >
            <div>
              <h4 className="heading text-2xl mb-[15px]">
                Centro de Información del Hotel
              </h4>
              <p className="font-glida text-[20px] leading-relaxed">
                Horario de Atención: Lunes – Domingo <br />
                <a
                  className="flex items-center gap-2"
                  href="tel:52 998 411 8355"
                >
                  Teléfono: +52 998 411 8355
                </a>
                Correo Electrónico: reservaciones@margaritavilleresorts.com.mx
              </p>
            </div>
          </div>
          {/* End Contact Info */}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
