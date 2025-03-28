import Link from "next/link";
import Image from "next/image";
import { footerLogos } from "./logoList";

const Footer = () => {
  return (
    <div className="relative bg-[#f1f1f1] pt-[90px]">
      {/* Shapes */}
      <div className="shape">
        <Image
          className="absolute hidden md:block left-0 top-0"
          src="/assets/images/footer/shape-1.svg"
          alt="Shape 1"
          width={100}
          height={100}
        />
        <Image
          className="absolute bottom-[20%] left-[15%] hidden lg:block"
          src="/assets/images/footer/shape-2.svg"
          alt="Shape 2"
          width={100}
          height={100}
        />
        <Image
          className="absolute hidden md:block right-[5%] top-[35%]"
          src="/assets/images/footer/shape-3.svg"
          alt="Shape 3"
          width={100}
          height={100}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-[30px] lg:flex justify-between mb-[60px] relative z-[1]">
          {/* Logo and Description */}
          <div className="rts__widget">
            <Link href="/">
              <Image
                src="/assets/images/logo/logo.webp"
                alt="Footer Logo"
                width={200}
                height={50}
                style={{ filter: "invert(1) grayscale(100%) brightness(0)" }}
              />
            </Link>
            <p className="max-w-[290px] mt-[20px] inset-0">
              Cada habitación cuenta con ropa de cama suave, sábanas de alta
              calidad y una selección de almohadas para garantizar un descanso
              reparador.
            </p>
          </div>

          {/* Guest Services */}
          <div>
            <span className="block text-[20px] font-bold text-heading capitalize mb-[20px]">
              Servicio al huésped
            </span>
            <ul className="flex flex-col gap-[10px]">
              <li>Recepción 24/7</li>
              <li>Estacionamiento</li>
              <li>Servicio a la Habitación</li>
              <li>Wi-Fi Gratis</li>
              <li>Servicio de Conserjería</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-5">
            <span className="block text-2xl font-bold text-heading capitalize">
              Contáctanos
            </span>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="tel:52 998 411 8355"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                  aria-label="Phone number"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
                  </svg>
                  +52 998 411 8355
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:reservaciones@margaritavillerivieramaya.com.mx"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                  aria-label="Email address"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                  </svg>
                  reservaciones@margaritavillerivieramaya.com.mx
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t-[1px] border-[#e5e5e5] py-[40px] relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap md:justify-between justify-center items-center gap-[30px]">
            <p className="mb-0">
              © 2025, Karisma Hotels & Resorts. All rights reserved.
            </p>
            <div className="flex items-center gap-[30px]">
              <Link
                href="#"
                className="pr-[25px] border-r-[1px] border-[#65676b] leading-4"
              >
                <i
                  className="fab fa-facebook-f"
                  style={{ marginRight: "5px" }}
                ></i>
                Facebook
              </Link>
              <Link href="#" className="leading-4">
                <i
                  className="fab fa-twitter"
                  style={{ marginRight: "5px" }}
                ></i>
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-[#e5e5e5] py-[40px] relative z-10 bg-[#52476d]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap md:justify-between justify-center items-center gap-[30px]">
            {footerLogos?.map((itm, index) => (
              <div key={`footer-key-${index}`}>
                <img
                  key={`footer-logo-${index}`}
                  src={`${itm.img}`}
                  height={100}
                  width={100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
