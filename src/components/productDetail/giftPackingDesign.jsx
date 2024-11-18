import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ENV } from "../../config/config";

export default function GiftPackingDesign({
  giftBoxes,
  selectedGiftBox,
  setSelectedGiftBox,
}) {
  return (
    <>
    <p className="mt-5 mb-2" style={{color: "#aeb4be", fontSize: "large"}}>Chosen a beautifully crafted gift packing design</p>
    <Row style={{ height: "350px", overflow: "scroll" }} className="mt-3">
      {giftBoxes.length > 0 &&
        giftBoxes.map(({ _id, fileName, price }) => (
          <Col
            md={3}
            xs={6}
            sm={4}
            key={_id}
            style={{
              border: selectedGiftBox?._id === _id ? "5px solid #333" : "",
              cursor: "pointer",
              marginBottom: "2rem",
            }}
          >
            <img
              src={`${ENV.fileBaseUrl}/${fileName}`}
              alt="Gift"
              className="mb-2"
              onClick={() =>
                setSelectedGiftBox({ gift: { _id, fileName, price } })
              }
              width={"100%"}
              height={150}
            />
            <p className="text-center mt-1">
              <b>SR {parseFloat(price).toFixed(2)}</b>
            </p>
          </Col>
        ))}
    </Row>
    </>
  );
}
