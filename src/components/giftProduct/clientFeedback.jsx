import React from "react";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    partialVisibilityGutter: 200,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 170,
  },
  tablet: {
    breakpoint: { max: 1024, min: 762 },
    items: 1,
    partialVisibilityGutter: 170,
  },
  mobile: {
    breakpoint: { max: 762, min: 0 },
    items: 1,
  },
};

export default function ClientFeedback() {
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 text-center">
        <h1>Clients Feedback</h1>
      </div>
      <div className="col-12 col-md-10 col-lg-10 mt-4">
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
          partialVisible={true}
        >
          <div className="ms-3">
            <div className="feedback-section">
              <h4 className="mb-3 text">
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              </h4>
              <h5 className="fw-bold mt-5">Lorem Ipsum</h5>
              <h5>
                Lorem ipsum dolor sit amet.
              </h5>
            </div>
          </div>
          <div className="ms-3">
            <div className="feedback-section">
            <h4 className="mb-3 text">
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              </h4>
              <h5 className="fw-bold mt-5">Lorem Ipsum</h5>
              <h5>
                Lorem ipsum dolor sit amet.
              </h5>
            </div>
          </div>
          <div className="ms-3">
            <div className="feedback-section">
            <h4 className="mb-3 text">
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              </h4>
              <h5 className="fw-bold mt-5">Lorem Ipsum</h5>
              <h5>
                Lorem ipsum dolor sit amet.
              </h5>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
