import React from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { ENV } from "../../../config/config";

const AddressSection = ({ address }) => {
  return (
    <div className="text-muted" style={{ fontSize: "0.875em" }}>
      <p className="mt-2 mb-0">{`${address?.first_name} ${address?.last_name}`}</p>
      <p className="mb-0">{address?.email}</p>
      <p className="mb-0">{`${address?.address} ${address?.city} ${
        address?.state
      } ${address?.state}, ${address?.postalCode} ${
        address?.country || ""
      }`}</p>
      <p className="mb-0">{address?.phone}</p>
    </div>
  );
};


export default function OrderDetailModal({ modalShow, onHide, order }) {
  const { transaction, productInfo, shippingInfo, billingInfo } = order;
  const products = [
    ...new Map(
      productInfo.map((item) => [item["Product"]["id"], item])
    ).values(),
  ];
  const isGiftProduct = (items) => {
    return items.length > 0 && items.some((item) => item.gift_wrap);
  };
  return (
    <Modal
      show={modalShow}
      onHide={onHide}
      dialogClassName="order-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <p style={{ fontSize: 22, fontWeight: 700 }}>
         Order ID: {transaction?.ref}
          </p>
          <p style={{ fontSize: 16 }}>
            <small class="text-muted">
              Order Date: {moment(order.createdAt).format("LLL")}
            </small>
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          {products.map((item, index) => (
            <Row className="mb-4">
              <Col xs={12} md={9}>
                <div className="d-flex">
                  <img
                    src={
                      item.Product?.ProductImage?.length > 0
                        ? `https://drbdesignksa.daftra.com/${item.Product?.ProductImage[0].file_full_path}`
                        : item.Product?.ProductImageS3?.length > 0 &&
                          item.Product.ProductImageS3[0].file_full_path
                    }
                    height={80}
                    width={80}
                    style={{ borderRadius: 4 }}
                    alt={item.Product.name}
                  />
                  <p className="ms-3 mt-4">
                    <small className="text-muted">{item.Product.name}</small>
                  </p>
                </div>
                {isGiftProduct(order.items) &&
                  order.items[index]?.gift_wrap && (
                    <div className="d-flex mt-3">
                      {order.items[index]?.gift_wrap ? (
                        <img
                          src={`${ENV.fileBaseUrl}/${order.items[index].gift_wrap.fileName}`}
                          height={80}
                          width={80}
                          style={{ borderRadius: 4 }}
                          alt={item.Product.name}
                        />
                      ) : (
                        "-"
                      )}
                      <p className="ms-3 mt-4">
                        <small className="text-muted">Gift Wrap</small>
                      </p>
                    </div>
                  )}
              </Col>
              <Col xs={6} md={3} className="text-end">
                <div className="mt-3">
                  <h6 style={{ fontWeight: "bold" }}>
                    SR {parseFloat(item.Product.unit_price).toFixed(2)}
                  </h6>
                  <p>
                    <small className="text-muted">
                      Qty:{" "}
                      {order?.items?.length > 0
                        ? order.items[index]?.quantity
                        : 1}
                    </small>
                  </p>
                </div>
                {isGiftProduct(order.items) &&
                  order.items[index]?.gift_wrap && (
                    <div className="mt-5">
                      <h6 style={{ fontWeight: "bold" }}>
                        {order.items[index]?.gift_wrap
                          ? `SR ${parseFloat(
                              order.items[index].gift_wrap.price
                            ).toFixed(2)}`
                          : "-"}
                      </h6>
                      <p>
                        <small className="text-muted">
                          Qty:{" "}
                          {order?.items?.length > 0
                            ? order.items[index]?.quantity
                            : 1}
                        </small>
                      </p>
                    </div>
                  )}
              </Col>
            </Row>
          ))}
          <hr className="mt-5 mb-4" />
          <Row className="mb-4">
            <Col xs={12} md={3}>
              <h6 style={{ fontWeight: 600 }}>Payment</h6>
              <div className="text-muted">
                <p className="mt-2 mb-0">
                  <small>{transaction?.card?.type}</small>
                </p>
                <p className="mb-0">
                  <small>
                    {transaction?.card?.last4.slice(2)}**{" "}
                    {transaction?.card?.expiry?.month}/
                    {transaction?.card?.expiry?.year}
                  </small>
                </p>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <h6 style={{ fontWeight: 600 }}>Shipping Address</h6>
              <AddressSection address={shippingInfo} />
            </Col>
            <Col xs={12} md={4}>
              <h6 style={{ fontWeight: 600 }}>Billing Address</h6>
              {billingInfo ? (
                <AddressSection address={billingInfo} />
              ) : (
                <AddressSection address={shippingInfo} />
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
