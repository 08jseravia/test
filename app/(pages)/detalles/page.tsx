"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import RoomDetailSection from "@/app/components/RoomDetailSection";
import { roomData } from "@/app/components/room";
import Script from "next/script";

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
      if (room) {
        return room;
      }
    }
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-16881320456"
      />
      <Script
        id="google-ads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16881320456');
            `,
        }}
      />
      <Header />
      <RoomDetailSection room={findRoomById(paramId) as Room} discount={25} />
      <Footer />
    </>
  );
};

const MainRoomDetails = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RoomDetails />
  </Suspense>
);

export default MainRoomDetails;
