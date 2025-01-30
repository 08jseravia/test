"use client";
import React from "react";

const ContactSection = () => {
  return (
    <div className="relative pb-[80px] lg:pb-[120px] mt-[40px]">
      <div
        className="relative h-[400px] lg:h-[700px] bg-cover bg-center bg-no-repeat flex items-center before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-heading before:opacity-60"
        style={{ backgroundImage: "url(/asset/images/pages/header__bg.webp)" }}
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
                        ></textarea>
                        <img
                          src="/assets/images/icon/message.svg"
                          className="absolute top-[20%] left-[15px]"
                          width="20"
                          height="20"
                          alt=""
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#00beba] rounded-[6px] !text-sm !p-[12px_35px] fill w-full text-white"
                    >
                      Enviar Mensaje
                    </button>
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
            ></iframe>
          </div>
          {/* End Map */}

          {/* Contact Info */}
          <div
            className="contact flex flex-col gap-[30px] lg:gap-[40px]"
            style={{ fontFamily: "Rubik" }}
          >
            <div>
              <h4
                className="heading text-2xl mb-[15px]"
                style={{ fontFamily: "Rubik" }}
              >
                Centro de Información del Hotel
              </h4>
              <p className="font-glida text-[20px] leading-relaxed">
                Open Hours: Monday – Sunday <br />
                Telephone: +12505550199 <br />
                Fax: +12505550199 <br />
                Email: info@moonlit.com
              </p>
            </div>
            <div>
              <h4 className="heading text-2xl mb-[15px]">
                Ubicación del Hotel
              </h4>
              <p className="font-glida text-[20px] leading-relaxed">
                Address: The Ritz-Carlton (California, USA) <br />
                Telephone: +12505550199 <br />
                Fax: +12505550199 <br />
                Email: info@moonlit.com
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
