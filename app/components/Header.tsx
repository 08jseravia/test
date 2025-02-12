"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#205172] shadow-md fixed top-0 z-50 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex  items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src={"/assets/logo.webp"}
                  height={120}
                  width={120}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="hidden md:flex md:space-x-8 md:ml-10">
              <Link href="/">
                <p className="text-white hover:text-gray-300">Inicio</p>
              </Link>
              {/* <Link href="/about">
                <p className="text-white hover:text-gray-300">About</p>
              </Link> */}
              <Link href="/preguntas">
                <p className="text-white hover:text-gray-300">Preguntas</p>
              </Link>
              {/* <Link href="/services">
                <p className="text-white hover:text-gray-300">Servicios</p>
              </Link> */}
              <Link href="/contacto">
                <p className="text-white hover:text-gray-300">Contacto</p>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <a
                className="flex gap-[10px] items-center text-xs text-white"
                href="callto:52 99 8411 8355"
              >
                <i className="flaticon-phone-flip relative top-[3px]"></i>
                +52 99 8411 8355
              </a>
            </div>
            <div className="-mr-2 flex md:hidden">
              <a
                className="flex gap-[10px] items-center text-xs text-white mr-8"
                href="callto:52 99 8411 8355"
              >
                <i className="flaticon-phone-flip relative top-[3px]"></i>
                +52 99 8411 8355
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <p className="block text-white hover:text-gray-300">Inicio</p>
            </Link>
            <Link href="/preguntas">
              <p className="block text-white hover:text-gray-300">Preguntas</p>
            </Link>
            {/* <Link href="/services">
              <p className="block text-white hover:text-gray-300">Servicios</p>
            </Link> */}
            <Link href="/contacto">
              <p className="block text-white hover:text-gray-300">Contacto</p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
