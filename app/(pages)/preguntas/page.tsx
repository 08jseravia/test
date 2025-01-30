import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import QuestionSection from "@/app/components/QuestionSection";
import * as React from "react";

interface QuestionsProps {}

const Questions = (props: QuestionsProps) => {
  return (
    <>
      <Header />
      <QuestionSection />
      <Footer />
    </>
  );
};

export default Questions;
