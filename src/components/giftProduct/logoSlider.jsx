import Slider from "react-slick";
import { ENV } from "../../config/config";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 3000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 882,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        // initialSlide: 2
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

export default function LogoSlider({logoList}) {
  return (
    <div className="slider-container mt-md-5 mt-3 mt-sm-4 mb-md-5 mb-sm-4 mb-3">
      <Slider {...settings}>
        {logoList.length > 0 &&
          logoList.map((logo, i) => (
            <div
              className="logo-container"
              key={i}
            >
              <img
                src={`${ENV.fileBaseUrl}/${logo.fileName}`}
                alt={"logo"}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}
