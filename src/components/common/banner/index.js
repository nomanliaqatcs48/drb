import Carousel from "react-bootstrap/Carousel";
import { isMobile } from "react-device-detect";
import { ENV } from "../../../config/config";
import { useNavigate } from "react-router-dom";

const Banner = ({ bannerProducts }) => {
  const navigate = useNavigate();
  return (
    <Carousel className="mb-4" indicators={isMobile ? false : true}>
      {bannerProducts.length > 0 &&
        bannerProducts.map((banner, i) => (
          <Carousel.Item key={i} onClick={() =>
            navigate(`/souvenirs/category/${banner.categoryId}`)
          } className="cursor-pointer">
            <img
              className="d-block w-100 h-210"
              src={`${ENV.fileBaseUrl}/${banner.fileName}`}
              alt={banner.title}
              
            />
            {/* <Carousel.Caption>
              <h3 className="banner-img-title">
                <span>{banner.title}</span>
              </h3>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Banner;
