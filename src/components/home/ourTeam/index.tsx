import React, { useRef, useContext, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "react-bootstrap/Card";
import { Row, Col, Container } from "react-bootstrap";
import styles from "../ourTeam/style.module.scss";
import Images from "../../../assets/images";
import SVGS from "../../../assets/svg";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedProducts } from "../../../redux/actions/product";
import { ENV } from "../../../config/config";

function NextArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className={`${styles.next} NextBlog`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
      >
        <path
          d="M6.3998 4.88006L1.8098 0.29006C1.62244 0.103809 1.36899 -0.000732422 1.1048 -0.000732422C0.840616 -0.000732422 0.587165 0.103809 0.399802 0.29006C0.306074 0.383023 0.23168 0.493624 0.180911 0.615483C0.130142 0.737343 0.104004 0.868048 0.104004 1.00006C0.104004 1.13207 0.130142 1.26278 0.180911 1.38464C0.23168 1.5065 0.306074 1.6171 0.399802 1.71006L4.9998 6.29006C5.09353 6.38302 5.16793 6.49362 5.21869 6.61548C5.26946 6.73734 5.2956 6.86805 5.2956 7.00006C5.2956 7.13207 5.26946 7.26278 5.21869 7.38464C5.16793 7.5065 5.09353 7.6171 4.9998 7.71006L0.399802 12.2901C0.211499 12.477 0.105184 12.7312 0.104246 12.9965C0.103308 13.2619 0.207825 13.5168 0.394803 13.7051C0.581781 13.8934 0.835903 13.9997 1.10127 14.0006C1.36663 14.0016 1.6215 13.897 1.8098 13.7101L6.3998 9.12006C6.96161 8.55756 7.27716 7.79506 7.27716 7.00006C7.27716 6.20506 6.96161 5.44256 6.3998 4.88006Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

function PrevArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className={styles.prev}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
      >
        <path
          d="M1.6002 4.88006L6.1902 0.29006C6.37756 0.103809 6.63101 -0.000732422 6.8952 -0.000732422C7.15938 -0.000732422 7.41284 0.103809 7.6002 0.29006C7.69393 0.383023 7.76832 0.493624 7.81909 0.615483C7.86986 0.737343 7.896 0.868048 7.896 1.00006C7.896 1.13207 7.86986 1.26278 7.81909 1.38464C7.76832 1.5065 7.69393 1.6171 7.6002 1.71006L3.0002 6.29006C2.90647 6.38302 2.83207 6.49362 2.78131 6.61548C2.73054 6.73734 2.7044 6.86805 2.7044 7.00006C2.7044 7.13207 2.73054 7.26278 2.78131 7.38464C2.83207 7.5065 2.90647 7.6171 3.0002 7.71006L7.6002 12.2901C7.7885 12.477 7.89482 12.7312 7.89575 12.9965C7.89669 13.2619 7.79217 13.5168 7.6052 13.7051C7.41822 13.8934 7.1641 13.9997 6.89873 14.0006C6.63337 14.0016 6.3785 13.897 6.1902 13.7101L1.6002 9.12006C1.03839 8.55756 0.722836 7.79506 0.722836 7.00006C0.722836 6.20506 1.03839 5.44256 1.6002 4.88006Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default function OurTeam({homePageContent}:{homePageContent: any}) {
  const sliderRef: any = useRef();
  const context: any = useContext(IntlContext);
  const dispatch = useDispatch()

  const handleClickPrev = () => {
    sliderRef.current.slickPrev();
  };

  const { featuredProducts } = useSelector(
    (state: any) => state.product
  );

  const handleClickNext = () => {
    sliderRef.current.slickNext();
  };

  useEffect(() => {
    dispatch<any>(getFeaturedProducts())
  },[])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };
  return (
    <div
      className={styles.wrapper}
      dir={context.state.locale === "sa" ? "rtl" : "ltr"}
    >
      <Container className={styles.Container}>
        <Row className={`${styles.row}`}>
          <Col sm={12} lg={5} className={styles.content}>
            <div style={{ paddingTop: "25px" }}>
              <h2 className={styles.font}>
                {context.state.locale === "sa" ? homePageContent?.sa_souvenir_title : homePageContent?.en_souvenir_title }
              </h2>
              <p>
                {context.state.locale === "sa" ? homePageContent?.sa_souvenir_desc : homePageContent?.en_souvenir_desc }.
              </p>
              <div className="d-lg-flex align-items-center mt-30 d-none">
                <div className={`d-lg-flex align-items-center ${context.state.locale === "sa" && "ml-2"}`}>
                  {context.state.locale === "en" && (
                    <PrevArrow onClick={handleClickPrev} />
                  )}
                  <NextArrow onClick={handleClickNext} />
                  {context.state.locale === "sa" && (
                    <PrevArrow onClick={handleClickPrev} />
                  )}
                </div>
                <SVGS.DesignShape />
              </div>
            </div>
          </Col>
          <Col sm={12} lg={7}>
            <Slider ref={sliderRef} {...settings}>
              {featuredProducts.length>0 && featuredProducts.map((product: any, i: number) => (
                  <div key={i}>
                    <Card
                      style={{
                        backgroundColor: "rgba(95, 187, 70, 0.29)",
                        border: "0px",
                        borderRadius: "0px",
                      }}
                    >
                      
                      <div
                        style={{
                          padding: "16px",
                        }}
                      >
                        
                        <Card.Img variant="top" src={`${ENV.fileBaseUrl}/${product.fileName}`} width={"100%"} className={`${styles.featureImg}`} />
                        <Card.Body style={{ padding: "16px 0px 0px 0px" }}>
                          <Row>
                            <Col xs={12}>
                              <hr />
                              <Card.Title className={`${styles.namest}`}>
                                {product.title}
                              </Card.Title>
                            </Col>
                           
                          </Row>
                        </Card.Body>
                      </div>
                    </Card>
                  </div>
                )
              )}
            </Slider>
            <div className="d-flex align-items-center d-lg-none justify-content-center">
              {context.state.locale === "en" && (
                <PrevArrow onClick={handleClickPrev} />
              )}
              <NextArrow onClick={handleClickNext} />
              {context.state.locale === "sa" && (
                <PrevArrow onClick={handleClickPrev} />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}