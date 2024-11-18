import { useContext } from "react";
import Banner from "../common/banner";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CartSvg } from "../../assets/cart";
import { IntlContext } from "../../context/Internationalization";
import LogoSlider from "./logoSlider";
import Services from "./services";
import ContactUs from "../contactUs/main";
import Raseel from "./raseel";
import Server from "./serve";
import ClientFeedback from "./clientFeedback";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const NewProduct = ({
  productCategories,
  products,
  productGiftCategoriesLoading,
  logoList
}) => {
  const navigate = useNavigate();
  const context = useContext(IntlContext);
  return (
    <>
      {productCategories.length > 0 ? (
        <>
          <Banner
            bannerProducts={
              productCategories.length > 0
                ? productCategories.filter((item) => item.isBanner)
                : []
            }
          />

          <LogoSlider logoList={logoList}  />
          <Services />
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-10">
              {/* <h1>Contact us now</h1> */}
              <ContactUs page={"gift"} />
            </div>
          </div>
          <Raseel productCategories={productCategories} />
          <Server />
          <ClientFeedback />
          <div className="mt-5">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-9 mt-5">
                <div className="row">
                  <h1 className="text-center mb-4">Our Creation</h1>
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
                  >
                    {products?.length > 0 &&
                      products.map(
                        (product) =>
                          product.Product && (
                            <div
                              key={product.Product.id}
                              style={{ marginInline: "1rem" }}
                            >
                              <Card className="pb-1 mb-4">
                                <div
                                  style={{
                                    height: 280,
                                    backgroundImage: `url(${
                                      product.Product?.ProductImage?.length > 0
                                        ? `https://drbdesignksa.daftra.com/${product.Product.ProductImage[0].file_full_path}`
                                        : product.Product?.ProductImageS3
                                            ?.length > 0 &&
                                          product.Product.ProductImageS3[0]
                                            .file_full_path
                                    })`,
                                    width: "100%",
                                    cursor: "pointer",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                  }}
                                  className="mt-1"
                                  onClick={() =>
                                    navigate(
                                      `/souvenirs/${product?.Product?.id}`
                                    )
                                  }
                                ></div>
                                <CardContent className="mt-1 px-3">
                                  <div className="w-100 text-center mb-2">
                                    <b
                                      style={{
                                        color: "#4f489e",
                                        fontSize: "1.2rem",
                                      }}
                                    >
                                      SAR{" "}
                                      {parseFloat(
                                        product.Product?.unit_price
                                      ).toFixed(2)}
                                    </b>
                                  </div>
                                  <p className="mb-2 mt-1 title-wrap text-capitalize text-center">
                                    {product.Product.name}
                                  </p>
                                  <div className="d-flex ml-auto mt-4 mb-2">
                                    <div
                                      className="pointer submit-btn"
                                      onClick={() =>
                                        navigate(
                                          `/souvenirs/${product.Product.id}`
                                        )
                                      }
                                    >
                                      <span className="mr-1">Add to Cart</span>
                                      <CartSvg
                                        width={18}
                                        height={18}
                                        color={"#FFFFFF"}
                                      />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )
                      )}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2
          className="text-center"
          style={{ marginTop: "11rem", minHeight: "18vh" }}
        >
          {" "}
          {productGiftCategoriesLoading
            ? "Loading..."
            : "Product categories not found"}
        </h2>
      )}
    </>
  );
};

export default NewProduct;
