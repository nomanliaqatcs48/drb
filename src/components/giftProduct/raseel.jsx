import React from "react";
import Carousel from "react-multi-carousel";
import { ENV } from "../../config/config";
import ProductCard from "../common/ProductCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    partialVisibilityGutter: 120,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    partialVisibilityGutter: 80,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    partialVisibilityGutter: 60,
  },
  mobile: {
    breakpoint: { max: 668, min: 0 },
    items: 1,
  },
};

export default function Raseel({ productCategories }) {
  return (
    <div className="row justify-content-center mb-3">
      <div className="col-12 col-md-3 col-lg-3">
        <h1>Why DRB?</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in purus faucibus, tempus purus sed, suscipit.
        </p>
      </div>
      <div className="col-12 col-md-7 col-lg-7">
        <Carousel
          responsive={responsive}
          slidesToSlide={1}
          autoPlaySpeed={3000}
          autoPlay
          swipeable
          infinite
          minimumTouchDrag={80}
          draggable
          arrows
          partialVisbile
        >
          {productCategories.length > 0 &&
            productCategories
              .filter((item) => !item.isBanner)
              .map((category, i) => (
                <div key={i} style={{ marginInline: "0.3rem" }}>
                <ProductCard
                  name={category.title || ""}
                  imageUrl={`${ENV.fileBaseUrl}/${category.fileName}`}
                  redirectUrl={`/souvenirs/category/${category.categoryId}`}
                  section="category"
                />
                </div>
              ))}
        </Carousel>
      </div>
    </div>
  );
}
