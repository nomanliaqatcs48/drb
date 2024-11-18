import React, { useEffect } from "react";
import ProductBanner from "../productBanner";
import Trending from "../trending";
import Features from "../features";
import OurTeam from "../ourTeam";
import { useSelector } from "react-redux";

const Home = () => {
  const { homePageContent } = useSelector((state: any) => state.content);
  const { productCategories } = useSelector((state: any) => state.product);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    localStorage.removeItem("redirectURL");
  }, []);

  return (
    <div className="main-wrapper ">
      {productCategories.length > 0 && (
        <ProductBanner
          homePageContent={homePageContent}
          productCategories={productCategories}
        />
      )}
      <Trending homePageContent={homePageContent} />
      <Features homePageContent={homePageContent} />
      <OurTeam homePageContent={homePageContent} />
    </div>
  );
};

export default Home;
