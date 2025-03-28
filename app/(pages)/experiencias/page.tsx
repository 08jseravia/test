import Banner from "@/app/components/Banner";
import ActivitiesCarousel from "@/app/components/experiencias/ActivitiesCarousel";
import CulinaryExperience from "@/app/components/experiencias/CulinaryExperience";
import ExperienciasExtraordinarias from "@/app/components/experiencias/ExperienciasExtraordinarias";
import LiveMusicCarousel from "@/app/components/experiencias/LiveMusic";
import SpaCarousel from "@/app/components/experiencias/SPASection";
import WeekleyHappening from "@/app/components/experiencias/WeeklyHappenings";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import * as React from "react";

interface QuestionsProps {}

const Questions = (props: QuestionsProps) => {
  return (
    <>
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
