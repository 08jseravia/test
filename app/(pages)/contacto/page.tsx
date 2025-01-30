"use client";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import * as React from "react";

interface ContactProps {}

const Contact = (props: ContactProps) => {
  return (
    <>
      <Header />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Contact;
