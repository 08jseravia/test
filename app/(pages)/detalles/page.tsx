"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import RoomDetailSection from "@/app/components/RoomDetailSection";
import { roomData } from "@/app/components/room";

const RoomDetails = () => {
  const searchParams = useSearchParams();

  function findRoomById(roomId: number) {
    for (const category of roomData) {
      const room = category.rooms.find((r) => r.id === Number(roomId));
      if (room) {
        return room;
      }
    }
    return null;
  }
  const paramId = Number(searchParams.get("id"));
  return (
    <>
      <Header />
      <RoomDetailSection room={findRoomById(paramId)} discount={20} />
      <Footer />
    </>
  );
};

export default RoomDetails;
