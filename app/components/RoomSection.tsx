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
    <div className="relative pt-[80px] lg:pt-[10px]">
      <div className="container mx-auto p-4 ">
        <div className="flex justify-between items-center flex-wrap gap-[30px] lg:gap-0 mb-[40px]">
          <div>
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
