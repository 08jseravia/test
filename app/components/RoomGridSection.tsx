import * as React from "react";
import RoomsGrid from "./RoomGrid";
import roomData from "@/app/components/roomSliderData";

const RoomGridSection = () => {
  return (
    <div className="flex w-full mt-24 justify-center">
      <RoomsGrid rooms={roomData} />
    </div>
  );
};

export default RoomGridSection;
