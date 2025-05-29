import Banner from "@/app/components/Banner";
import ActivitiesCarousel from "@/app/components/experiencias/ActivitiesCarousel";
import CulinaryExperience from "@/app/components/experiencias/CulinaryExperience";
import ExperienciasExtraordinarias from "@/app/components/experiencias/ExperienciasExtraordinarias";
import LiveMusicCarousel from "@/app/components/experiencias/LiveMusic";
import SpaCarousel from "@/app/components/experiencias/SPASection";
import WeekleyHappening from "@/app/components/experiencias/WeeklyHappenings";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Script from "next/script";
import * as React from "react";

interface QuestionsProps {}

const Questions = (props: QuestionsProps) => {
  return (
    <>
      {" "}
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
      <ExperienciasExtraordinarias />
      <WeekleyHappening />
      <ActivitiesCarousel />
      <LiveMusicCarousel />
      <SpaCarousel />
      <CulinaryExperience />
      <Footer />
    </>
  );
};
export default Questions;
