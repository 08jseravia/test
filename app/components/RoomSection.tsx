"use client";
import { useEffect, useState } from "react";
import roomData from "./roomSliderData";
import RoomSlider from "./RoomSlider";

const RoomsSection = () => {
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    // Get the current month name
    const month = new Date().toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
  }, []);

  return (
    <div className="relative py-[80px] lg:py-[120px]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center flex-wrap gap-[30px] lg:gap-0 mb-[40px]">
          <div>
            <span
              style={{ color: "#00beba" }}
              className="text-xl heading-6 relative mb-[15px] left-[65px] text-primary inline-block before:absolute before:left-[-65px] before:bottom-[50%] before:w-[52px] before:h-[12px] before:bg-no-repeat before:bg-[url('/images/shape/section__style__two.html')] before:transform before:translate-y-2/4"
            >
              Habitación
            </span>
            <h2
              className="text-4xl md:text-5xl capitalize font-greatvibes"
              style={{ fontFamily: "GreatVibes" }}
            >
              Nuestras habitaciones
            </h2>
          </div>
          <div>
            <p className="text-sm max-w-[645px]">
              Nuestras habitaciones ofrecen una combinación armoniosa de confort
              y elegancia, diseñadas para brindar una estancia excepcional a
              cada huésped. Cada habitación cuenta con ropa de cama suave,
              sábanas de alta calidad y una selección de almohadas para asegurar
              un descanso reparador.
            </p>
          </div>
          <div>
            <RoomSlider roomData={roomData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsSection;
