"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import AboutSection from "./components/AboutSection";
import FacilitySection from "./components/FacilitySection";
import RoomSlider from "./components/RoomSection";
import { FormEvent, useState } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <AboutSection />
      <FacilitySection />
      <RoomSlider />
      <Footer />
    </>
  );
}
