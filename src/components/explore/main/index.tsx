import React, { useEffect } from "react";
import HeroSection from "../heroSection";
import CardsList from "../cardsList/index";

function Explore() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <HeroSection />
      <CardsList />
    </>
  );
}

export default Explore;
