import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { ENV } from "../../../config/config";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
    partialVisibilityGutter: 120,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    partialVisibilityGutter: 80,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
    partialVisibilityGutter: 60,
  },
  mobile: {
    breakpoint: { max: 668, min: 0 },
    items: 1,
  },
};

export default function CaravanLocationImages({ caravanImagesList }) {
  const [caravanImages, setCaravanImages] = useState([]);

  useEffect(() => {
    setCaravanImages(caravanImagesList);
  }, [caravanImages]);

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-12 col-lg-12">
        <h3 className="mt-3 mb-3">Caravan Location</h3>
      </div>
      <div className="col-12 col-md-12 col-lg-12">
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
          {caravanImagesList.length > 0 &&
            caravanImagesList.map((caravan, i) => (
              <div key={i} style={{ marginInline: "0.3rem", height: 200 }}>
                <img
                  src={`${ENV.fileBaseUrl}/${caravan.fileName}`}
                  alt="caravan img"
                  width={"100%"}
                  // height={200}
                />
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
}
