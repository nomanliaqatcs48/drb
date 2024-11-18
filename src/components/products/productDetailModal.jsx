import React from "react";
import Carousel from "react-material-ui-carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import cross from "../../assets/cross.svg";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const AddCartButton = styled(Button)(() => ({
  backgroundColor: "#4f489e",
  "&:hover": {
    backgroundColor: "#4f489e",
  },
}));

const ProductDetailModal = React.memo(
  ({ product, closeModal, addCartItem }) => {
    const handleClose = () => closeModal();

    const DefaultSettingsT = {
      autoPlay: false,
      animation: "fade",
      indicators: false,
      duration: 500,
      navButtonsAlwaysVisible: true,
      navButtonsAlwaysInvisible: false,
      cycleNavigation: false,
      fullHeightHover: true,
      // swipe: true,
    };

    return (
      <Modal
        show={product ? true : false}
        onHide={handleClose}
        centered
        className={styles.modal_wrap}
      >
        <Modal.Body>
          <div className={styles.cross} onClick={handleClose}>
            <img src={cross} alt="cross" />
          </div>
          <Container style={{ paddingBlock: 70 }}>
            <Row>
              <Col md={6}>
                <Carousel {...DefaultSettingsT}>
                  {product.Product?.ProductImage.length > 0
                    ? product.Product.ProductImage.map((item, i) => (
                        <div key={i}>
                          <img
                            src={`https://drbdesignksa.daftra.com/${item.file_full_path}`}
                            alt={product.Product.name}
                            height={230}
                            width="100%"
                          />
                        </div>
                      ))
                    : product?.Product?.ProductImageS3.length > 0 &&
                      product.Product.ProductImageS3.map((item, i) => (
                        <div key={i}>
                          <img
                            src={item.file_full_path}
                            alt={product.Product.name}
                            height={230}
                            width="100%"
                          />
                        </div>
                      ))}
                </Carousel>
              </Col>
              <Col md={6}>
                <h4>{product?.Product.name}</h4>
                {product.Product?.category && (
                  <p className={styles.category}>
                    CATEGORY: {product.Product?.category}
                  </p>
                )}
                <p className={styles.price}>${product?.Product.unit_price}</p>
                <p className={styles.description}>
                  {product?.Product.description}
                </p>
                <AddCartButton
                  variant="contained"
                  className="w-50 mt-2"
                  onClick={() => addCartItem(product.Product.id)}
                >
                  Add to Cart
                </AddCartButton>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
);

export default ProductDetailModal;
