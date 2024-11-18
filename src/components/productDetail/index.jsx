import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from 'react-helmet';
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";
import Web3 from "web3";
import { IntlContext } from "../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import { ENV } from "../../config/config";
import PrintProductModal from "./printProductModal";
import {
  validateMetamask,
  isMetaMaskInstalled,
  redirectToMetaMaskExtension,
} from "../../helpers/web3";
import {
  getProduct,
  createCart,
  addCartItem,
  updateCartItem,
  getGiftBoxes,
} from "../../redux/actions/product";
import { getNFTAddresses, clearNFT } from "../../redux/actions/nft";
import GiftPackingDesign from "./giftPackingDesign";

const AddCartButton = styled(Button)(() => ({
  backgroundColor: "#4f489e",
  "&:hover": {
    backgroundColor: "#4f489e",
  },
}));

const ProductDetail = () => {
  const dispatch = useDispatch();
  const context = useContext(IntlContext);
  const navigate = useNavigate();

  // const [product, setProduct] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isCartBtnDisabled, setIsCartBtnDisabled] = useState(false);
  const [selectedGiftBox, setSelectedGiftBox] = useState(null);
  const [renderComponent, setRenderComponent] = useState(false);
  const { product, giftBoxes, cartItems } = useSelector(
    (state) => state.product
  );
  const [connectedAddress, setConnectedAddress] = useState(null);
  const { nftAddresses, nftLoading, nfts } = useSelector((state) => state.nft);
  const [selectedTab, setSelectedTab] = useState("marketplace");

  useEffect(() => {
    try {
      if (!window?.ethereum) {
        return;
      }

      const accountWasChanged = async (data) => {
        if (data.length === 0) {
          return toast.error("you are not connected with metamask");
        }
        if (selectedTab === "user") {
          setConnectedAddress(data[0]);
          // dispatch(getNFTAddresses(data[0]));
        }
      };

      window?.ethereum.on("accountsChanged", accountWasChanged);
      window?.ethereum.on("chainChanged", (chainId) => {
        if (Web3.utils.hexToNumber(chainId) !== ENV.chainId) {
        }
      });

      return () => {
        // Clean up event listeners
        window?.ethereum.removeListener("accountsChanged", accountWasChanged);
      };
    } catch (err) {
      console.log(err, "error==>");
    }
  }, [selectedTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(getGiftBoxes());
    setSelectedGiftBox(null)
  }, []);

  useEffect(() => {
    if(product && !renderComponent){
      setRenderComponent(true)
      window.fbq("track", "ViewContent", {
        content_name: product.Product.name,
        content_ids: [(product?.Product?.id).toString()],
        content_type: 'product',
        // product_catalog_id: "1763474294136858",
        value: product?.Product?.unit_price,
        currency: 'SAR'
      });
    }
  
  },[product])

  const addItem = (id, nft) => {
    if (!cartItems?._id) {
      let item = { productId: id, quantity: parseInt(qty) };
      if (nft) {
        item["nft"] = nft;
      }
      if(selectedGiftBox){
        const {_id, fileName, price} = selectedGiftBox;
        item["gift_wrap"] = {id: _id, fileName, price};
      }
      dispatch(
        createCart({
          userId: ENV.getUserKeys("_id")?._id,
          items: [item],
        })
      );
      return;
    }

    const findProduct = cartItems.items.find((item) => item.productId == id);
    let parmas = {
      id: cartItems._id,
      productId: id,
      quantity: parseInt(qty),
    };
    if (nft) {
      parmas["nft"] = nft;
    }
    if(selectedGiftBox){
      const {_id, fileName, price} = selectedGiftBox;
      parmas["gift_wrap"] = {id: _id, fileName, price};
    }

    if (findProduct && nft) {
      dispatch(updateCartItem(parmas));
      toast.success("Updated Cart");
      return;
    }

    dispatch(addCartItem(parmas));
  };

  const connectMetamask = async () => {
    if (isMetaMaskInstalled()) {
      const address = await validateMetamask(setLoading);
      if (address) {
        setConnectedAddress(address);
        setSelectedImage("");
        setIsOpenModal(true);
      }
      return;
    }
    toast.info("Please install metamask to continue");
    redirectToMetaMaskExtension();
  };

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    id && dispatch(getProduct(id));
    dispatch(clearNFT());
    dispatch(getNFTAddresses(false));
  }, []);

  useEffect(() => {
    dispatch(clearNFT());
    if (connectedAddress) {
      dispatch(
        getNFTAddresses(
          selectedTab === "marketplace" ? false : connectedAddress
        )
      );
    }
  }, [connectedAddress, selectedTab]);

  const setGiftBox = (gift) => {
    if (selectedGiftBox?._id === gift._id) {
      setSelectedGiftBox(null);
      return;
    }
    setSelectedGiftBox(gift);
  };

const totalPrice = (product) => {
  let totalPrice = parseFloat(product?.Product.unit_price)* qty;
  if(selectedGiftBox){
    totalPrice += (parseFloat(selectedGiftBox.price)* qty)
  }

  return totalPrice.toFixed(2)
}

  return (
    <Container className="main-wrapper">
     
      {product && (
        <>
         <Helmet>
         <meta property="og:id" content={(product?.Product?.id).toString()} />
          <meta property="og:title" content={product?.Product?.name || ""} />
          <meta property="og:description" content={product?.Product?.description || "-"} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:price:amount" content={product?.Product?.unit_price} />
          <meta property="og:image" content={product?.Product?.ProductImage?.length > 0 ? `https://drbdesignksa.daftra.com${product.Product.ProductImage[0].file_full_path}` : product?.Product?.ProductImageS3?.length > 0 ? product.Product.ProductImageS3[0].file_full_path : ""} />
          <meta property="product:brand" content={product?.Product?.brand} />
          <meta property="product:availability" content={product?.Product?.stock_balance < 1 ? "out of stock" :"in stock"} />
          <meta property="product:condition" content="new" />
          <meta property="product:price:amount" content={product?.Product?.unit_price} />
          <meta property="product:price:currency" content="SAR" />
          <meta property="product:retailer_item_id" content={(product?.Product?.id).toString()} />
          <meta property="product:quantity" content={1} />
          <meta property="product:item_group_id" content={product.Product?.ProductCategory?.length > 0 ? product.Product?.ProductCategory[0].id: "-"}></meta>
          {/* <meta property="product:catalog_id" content={'1763474294136858'}></meta> */}
          <meta property="product:fb_product_category" content={product.Product?.ProductCategory?.length > 0 ? product.Product?.ProductCategory[0].name: "-"} />

       </Helmet>
        <Row dir={context.state.locale === "sa" && "rtl"}>
          <Col md={5}>
            <Carousel showStatus={false}>
              {product?.Product?.ProductImage?.length > 0
                ? product.Product.ProductImage.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        height: isMobile ? 330 : 530,
                        width: isMobile ? "100%" : "90%",
                      }}
                    >
                      <img
                        src={`https://drbdesignksa.daftra.com${item.file_full_path}`}
                        alt={product.Product.name}
                        height={isMobile ? 330 : 530}
                        style={{ border: "1px solid #ddd", padding: 5 }}
                      />
                    </div>
                  ))
                : product?.Product?.ProductImageS3?.length > 0 &&
                  product.Product.ProductImageS3.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        height: isMobile ? 330 : 530,
                        width: isMobile ? "100%" : "90%",
                      }}
                    >
                      <img
                        src={item.file_full_path}
                        alt={product.Product.name}
                        height={isMobile ? 330 : 530}
                        style={{ border: "1px solid #ddd", padding: 5 }}
                      />
                    </div>
                  ))}
            </Carousel>
          </Col>
          <Col md={7} className="px-md-4">
            <p className={styles.title}>{product?.Product.name}</p>
            <hr className="mt-4 mb-4" />
            {product.Product?.ProductCategory?.length > 0 && (
              <p className={styles.category}>
                <FormattedMessage id="Category" />:{"  "}
                <span
                  style={
                    context.state.locale === "sa"
                      ? { marginRight: "1.5rem" }
                      : { marginLeft: "1.5rem" }
                  }
                >
                  {product.Product?.ProductCategory[0].name}
                </span>
              </p>
            )}
            <p className={styles.price}>
              SR {parseFloat(product?.Product.unit_price).toFixed(2)}
            </p>
            <p
              style={{
                fontSize: 14,
                color:
                  product.Product.stock_balance > 10 ? "#aeb4be" : "#e24343",
                marginTop: -3,
                fontWeight: 600,
              }}
            >
              {!product?.Product?.tags.includes("printable") &&
                (product.Product.stock_balance < 1
                  ? "Out of stock"
                  : product.Product.stock_balance > 10
                  ? "Stock Available"
                  : `Only ${product.Product.stock_balance} Items left`)}
            </p>
            <p className={styles.description}>{product?.Product.description}</p>
            <div className="d-flex mt-4">
              <span
                className={styles.heading}
                style={
                  context.state.locale === "sa"
                    ? { marginLeft: "2.5rem" }
                    : { marginRight: "2.5rem" }
                }
              >
                <FormattedMessage id="Quantity" />: {"  "}{" "}
              </span>
              <button
                className={styles.toogleBtn}
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
              <input
                className={styles.inputQty}
                type="text"
                name="qty"
                value={qty}
                onChange={(e) => {
                  /^[0-9]+$/.test(e.target.value) && setQty(e.target.value);
                }}
              />
              <button
                className={styles.toogleBtn}
                onClick={() => {
                  qty > 1 && setQty(qty - 1);
                }}
              >
                -
              </button>
            </div>
            <div className="d-flex mt-4">
              <span
                className={styles.heading}
                style={
                  context.state.locale === "sa"
                    ? { marginLeft: "2.5rem" }
                    : { marginRight: "2.5rem" }
                }
              >
                <FormattedMessage id="Total Price" />: {"  "}{" "}
              </span>
              <span
                className={styles.heading}
                style={
                  context.state.locale === "sa"
                    ? { marginLeft: "2.5rem" }
                    : { marginRight: "2.5rem" }
                }
              >
                SR {totalPrice(product)}
              </span>
              </div>
            {product.Product?.ProductCategory?.length > 0 &&
              product.Product?.ProductCategory[0].id === "223" && (
                <GiftPackingDesign
                  giftBoxes={giftBoxes}
                  selectedGiftBox={selectedGiftBox}
                  setSelectedGiftBox={({ gift }) => setGiftBox(gift)}
                />
              )}
            <div className=" mt-5">
              {product?.Product?.tags.includes("printable") ? (
                <>
                  {isMobile && (
                    <p className="text-center mt-3 text-danger">
                      Available On Desktop
                    </p>
                  )}

                  <AddCartButton
                    variant="contained"
                    className="w-100"
                    size="large"
                    disabled={loading || isMobile}
                    onClick={() => {
                      if (ENV.getUserKeys("_id")?._id) {
                        connectMetamask();
                      } else {
                        navigate("/sign-in");
                        localStorage.setItem(
                          "redirectURL",
                          `/souvenirs/${product.Product.id}`
                        );
                      }
                      
                    }}
                  >
                    <FormattedMessage id="Start Designing" />
                  </AddCartButton>
                </>
              ) : (
                <AddCartButton
                  variant="contained"
                  className="w-100"
                  size="large"
                  onClick={() => {
                    if (ENV.getUserKeys("_id")?._id) {
                      setIsCartBtnDisabled(true);
                      addItem(product.Product.id);
                      setTimeout(() => {
                        setIsCartBtnDisabled(false);
                      },1500);
                    } else {
                      navigate("/sign-in");
                      localStorage.setItem(
                        "redirectURL",
                        `/souvenirs/${product.Product.id}`
                      );
                    }
                  }}
                  disabled={product.Product.stock_balance < 1 && true || isCartBtnDisabled}
                >
                  <FormattedMessage id="Add to Cart" />
                </AddCartButton>
              )}
            </div>
          </Col>
          <PrintProductModal
            isOpenModal={isOpenModal}
            closeModal={() => setIsOpenModal(false)}
            product={product}
            nftAddresses={nftAddresses}
            selectedImage={selectedImage}
            setSelectedImage={(image) => setSelectedImage(image)}
            addItem={() => addItem(product.Product.id, selectedImage)}
            qty={qty}
            setQty={(val) => setQty(val)}
            setSelectedTab={(val) => setSelectedTab(val)}
            selectedTab={selectedTab}
            loadMore={(pageKey) =>
              dispatch(
                getNFTAddresses(
                  selectedTab === "marketplace" ? false : connectedAddress,
                  pageKey
                )
              )
            }
            nftLoading={nftLoading}
            nfts={nfts}
          />
        </Row>
        </>
      )}
      {/* <Backdrop
        sx={{
          color: "#5ebb45",
          marginTop: products?.length > 0 ? -5 : -46,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={products.length === 0 && isProductLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </Container>
  );
};

export default ProductDetail;
