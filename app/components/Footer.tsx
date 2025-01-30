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
          <div>
            <span className="block text-[20px] font-bold text-heading capitalize mb-[20px]">
              Contáctanos
            </span>
            <ul className="flex flex-col gap-[10px]">
              <li>
                <Link
                  href="tel:1.866.527.4762"
                  className="flex gap-2 items-center"
                  aria-label="footer__contact"
                >
                  <i className="flaticon-phone-flip"></i> +1.866.527.4762
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
            {Array.isArray(footerLogos) && footerLogos.map((itm, index) => (
              <div key={`footer-key-${index}`}>
                <Link href={itm.link}>
                  <img
                    key={`footer-logo-${index}`}
                    src={`${itm.img}`}
                    height={100}
                    width={100}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
