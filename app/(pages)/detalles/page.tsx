"use client";
<<<<<<< HEAD
import React from "react";
=======
import React, { Suspense } from "react";
>>>>>>> f5fcb170dab795220f77ae3e30ad42d616c5a9e8
import { useSearchParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import RoomDetailSection from "@/app/components/RoomDetailSection";
import { roomData } from "@/app/components/room";

<<<<<<< HEAD
const RoomDetails = () => {
  const searchParams = useSearchParams();

  function findRoomById(roomId: number) {
    for (const category of roomData) {
      const room = category.rooms.find((r) => r.id === Number(roomId));
=======
type Room = {
  id: number;
  name: string;
  img: string[]; // Array of image URLs
  desc: string; // Room description
  person: number; // Number of people the room can accommodate
  roomSize: string; // Room size as a string (e.g., "678 sqf | 63 m2")
  prices: {
    high: number; // High price
    low: number; // Low price
    Diciembre: number; // Price for December
    range: {
      low: string; // Low price range start date
      high: string; // High price range end date
    };
  };
};

const RoomDetails = () => {
  const searchParams = useSearchParams();
  const paramId = Number(searchParams.get("id"));

  function findRoomById(roomId: number) {
    for (const category of roomData) {
      const room = category.rooms.find((r) => r.id === roomId);
>>>>>>> f5fcb170dab795220f77ae3e30ad42d616c5a9e8
      if (room) {
        return room;
      }
    }
    return null;
  }
<<<<<<< HEAD
  const paramId = Number(searchParams.get("id"));
  return (
    <>
      <Header />
      <RoomDetailSection room={findRoomById(paramId)} discount={20} />
=======

  return (
    <>
      <Header />
      <RoomDetailSection room={findRoomById(paramId) as Room} discount={20} />
>>>>>>> f5fcb170dab795220f77ae3e30ad42d616c5a9e8
      <Footer />
    </>
  );
};

<<<<<<< HEAD
export default RoomDetails;
=======
const MainRoomDetails = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RoomDetails />
  </Suspense>
);

export default MainRoomDetails;
>>>>>>> f5fcb170dab795220f77ae3e30ad42d616c5a9e8
