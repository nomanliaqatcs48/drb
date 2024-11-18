import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import cross from "../../assets/cross.svg";
import { IntlContext } from "../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { isMobile } from "react-device-detect";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import InfoIcon from "@mui/icons-material/Info";

const ApplyButton = styled(Button)(() => ({
  backgroundColor: "#4f489e",
  "&:hover": {
    backgroundColor: "#4f489e",
  },
}));

const LinkButton = styled(Button)(() => ({
  color: "#4f489e",
  "&:hover": {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
}));

const ProductDetailModal = React.memo(
  ({
    isOpenModal,
    closeModal,
    product,
    nftAddresses,
    selectedImage,
    setSelectedImage,
    addItem,
    qty,
    setQty,
    selectedTab,
    setSelectedTab,
    loadMore,
    nftLoading,
    nfts,
  }) => {
    const handleClose = () => closeModal();
    const context = useContext(IntlContext);

    return (
      <Modal
        show={isOpenModal}
        onHide={handleClose}
        centered
        className={styles.modal_wrap}
      >
        <Modal.Body>
          <div className={styles.cross} onClick={handleClose}>
            <img src={cross} alt="cross" />
          </div>
          <Container
            style={{ paddingBlock: "0px 20px" }}
            dir={context.state.locale === "sa" ? "rtl" : "ltr"}
          >
            <Row className="mt-4">
              <Col md={6}>
                <h3 style={{ padding: "10px 0px" }}>
                  <FormattedMessage id="Printable Product" />
                </h3>
                <img
                  src={
                    product?.Product?.ProductImage?.length > 0
                      ? `https://drbdesignksa.daftra.com/${product.Product.ProductImage[0].file_full_path}`
                      : product.Product?.ProductImageS3?.length > 0 &&
                        product.Product.ProductImageS3[0].file_full_path
                  }
                  alt={"thumbnail"}
                  height={"385px"}
                  width="100%"
                  style={{
                    marginTop: isMobile ? "1rem" : "4.5rem",
                    objectFit: "contain",
                  }}
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="image"
                    width="80px"
                    height={"80px"}
                    style={{
                      position: "absolute",
                      top:
                        product.Product.name === "mug"
                          ? isMobile
                            ? "22%"
                            : "37%"
                          : isMobile
                          ? product.Product.name === "Book"
                            ? "23%"
                            : "21%"
                          : product.Product.name === "Book"
                          ? "38%"
                          : "35%",
                      left:
                        product.Product.name === "mug"
                          ? context.state.locale === "sa"
                            ? isMobile
                              ? "36%"
                              : "66%"
                            : isMobile
                            ? "36%"
                            : "20%"
                          : context.state.locale === "sa"
                          ? isMobile
                            ? "40%"
                            : "66%"
                          : isMobile
                          ? "40%"
                          : "20%",
                    }}
                  />
                )}
              </Col>
              <Col md={6}>
                <Tabs
                  value={selectedTab}
                  onChange={(event, newValue) => {
                    setSelectedTab(newValue);
                  }}
                >
                  <Tab
                    label={
                      <span className={styles.tabLabel}>
                        <FormattedMessage id={"Marketplace NFT's"} />
                      </span>
                    }
                    value="marketplace"
                  />
                  <Tab
                    label={
                      <span className={styles.tabLabel}>
                        <FormattedMessage id={"User NFT's"} />
                      </span>
                    }
                    value="user"
                  />
                </Tabs>
                {/* <h2 className="mt-3">NFT's</h2> */}
                <hr />
                <Row style={{ height: "320px", overflow: "scroll" }}>
                  {nfts.length > 0
                    ? nfts.map(
                        (nft, i) =>
                          nft.media.length > 0 &&
                          (nft?.media[0]?.raw ||
                            nft?.metadata?.image) && (
                            <Col md={4} xs={4} sm={4} key={i}>
                              <img
                                src={nft.media[0].raw}
                                style={{
                                  border:
                                    selectedImage ===
                                      nft?.media[0]?.raw ||
                                    selectedImage === nft?.metadata?.image
                                      ? "5px solid #333"
                                      : "",
                                  cursor: "pointer",
                                }}
                                className="mb-3"
                                onClick={() =>
                                  setSelectedImage(
                                    nft.media[0].raw ||
                                      nft?.metadata?.image
                                  )
                                }
                                width={90}
                                height={90}
                              />
                            </Col>
                          )
                      )
                    : !nftLoading && (
                        <h2 className={styles.message}>
                          <FormattedMessage id="You don't have NFT" />{" "}
                        </h2>
                      )}
                  {nftAddresses?.pageKey && (
                    <LinkButton
                      variant="text"
                      className=""
                      size="large"
                      onClick={() => loadMore(nftAddresses.pageKey)}
                    >
                      <FormattedMessage id="Add more" />
                    </LinkButton>
                  )}
                </Row>
                <div className="d-flex mt-4">
                  <span
                    className={styles.heading}
                    style={
                      context.state.locale === "sa"
                        ? { marginLeft: 20 }
                        : { marginRight: 20 }
                    }
                  >
                    <FormattedMessage id="Quantity" />:{" "}
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
                <div className="mt-5 mb-2">
                  <InfoIcon style={{ marginTop: -3 }} />
                  <span
                    className={context.state.locale === "sa" ? "mr-1" : "ml-1"}
                  >
                    <FormattedMessage id="Please select your NFT" />
                  </span>
                </div>
                <ApplyButton
                  variant="contained"
                  className="w-100"
                  size="large"
                  disabled={selectedImage ? false : true}
                  onClick={() => addItem()}
                >
                  <FormattedMessage id="Add to Cart" />
                </ApplyButton>
              </Col>
              <Backdrop
                sx={{
                  color: "#5ebb45",
                  paddingLeft: 45,
                  paddingBottom: 12,
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={nftLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
);

export default ProductDetailModal;
