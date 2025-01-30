import React from "react";
import RoomDetailSlider from "./RoomDetailSlider";
import ReservationForm from "./ReservationForm";

const RoomDetailSection = ({ room, discount }) => {
  function convertCurrencyToNumber(currencyString: string) {
    // Remove the dollar sign ($) and commas, then parse as a float
    const number = parseFloat(currencyString.replace(/[\$,]/g, ""));
    return number;
  }
  return (
    <div className="flex flex-col lg:mx-20 lg:py-[120px] mt-32 lg:mt-5 xl2:w-[50vw] xl2:mx-auto">
      <div className="flex  gap-[30px] flex-wrap lg:flex-nowrap w-full">
        <div className="w-full">
          <div className="mx-5">
            <span
              className="block h4 heading text-primary leading-none text-3xl text-[#b0916b]"
              style={{ fontFamily: "Rubik" }}
            >
              {new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
              }).format(room?.prices?.high)}
            </span>
            <h2
              className="heading text-4xl lg:text-5xl mt-[15px]"
              style={{ fontFamily: "GreatVibes" }}
            >
              {room?.name}
            </h2>
            <div className="flex gap-[20px] items-center mt-2 mb-3 text-[24px] font-glida">
              <span
                className="flex gap-2 text-2xl"
                style={{ fontFamily: "Rubik" }}
              >
                <i className="flaticon-user"></i>
                {room?.roomSize}
              </span>
            </div>
            <div className="flex gap-[20px] items-center mt-2 mb-3 text-[24px] font-glida">
              <span
                className="flex gap-2 text-2xl"
                style={{ fontFamily: "Rubik" }}
              >
                <i className="flaticon-user"></i>
                {room?.person} Personas
              </span>
            </div>

            <p
              className="text-center text-wrap text-md md:text-md lg:text-lg"
              style={{ fontSize: 18 }}
            >
              {room?.desc}
            </p>
          </div>
          <div className="flex">
            <RoomDetailSlider images={room?.img ?? []} />
          </div>
        </div>
        <div className="flex w-[100%]">
          <div className="rounded-[10px] z-10 dark:shadow-none lg:mt-[15%] mx-[10%] lg:mx-auto w-full lg:w-auto">
            <div className=" bg-gray-200  p-10 rounded-lg md:mt-24">
              <h5
                className="heading text-2xl text-center mb-[30px]"
                style={{ fontFamily: "Rubik" }}
              >
                Servicio al Huésped
              </h5>
              <ReservationForm room={room} discount={discount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailSection;
