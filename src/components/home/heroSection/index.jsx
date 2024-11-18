import React, { useContext } from "reac";
import Carousel from "react-bootstrap/Carousel";
import styles from "./styles.module.scss";
import Images from "../../../assets/images";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";

function Slider() {
  const context = useContext(IntlContext);
  return (
    <Carousel className={`heroSection ${styles.hero_wrap}`}>
      <Carousel.Item>
        <img className="d-block w-100" src={Images.bgone} alt="First slide" />
        <Carousel.Caption>
          <div className="d-lg-block d-none">
            <h3>ImmersE IN SAUDI METAVERSE</h3>
            <p>EXPEREINCE EVENTS IN SAUDI FROM ANYWHERE</p>
          </div>
          <div className="d-block d-lg-none">
            <h3>
              <FormattedMessage id="EXPLORE Immersive Spaces" />
            </h3>
            <p>
              Discover World’s creativity through Interactive 3D experiences
            </p>
          </div>
          <button
            style={{
              borderRadius: "30px",
              background: "#5FBB46",
              width: "228px",
              border: "none",
            }}
          >
            Dive in Now
          </button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Images.bgtwo} alt="Second slide" />

        <Carousel.Caption>
          <h3>
            <FormattedMessage id="EXPLORE Immersive Spaces" />{" "}
          </h3>
          <p>Discover World’s creativity through Interactive 3D experiences</p>
          <button
            style={{
              borderRadius: "30px",
              background: "#5FBB46",
              width: "228px",
              border: "none",
            }}
          >
            Dive in Now
          </button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
