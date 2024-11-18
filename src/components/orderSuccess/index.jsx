import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getOrderDetail } from "../../redux/actions/product";

export default function OrderSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoadingUpdateOrder, updateOrder } = useSelector(
    (state) => state.order
  );
console.log("update order: ", updateOrder);
  useEffect(() => {
    dispatch(getOrderDetail("success"));
  }, []);

  return (
    <Container style={{ paddingBlock: isMobile ? "10px 40px" : "130px" }}>
      <Row className="justify-content-center">
        {!isLoadingUpdateOrder ? (
          <>
            {/* <img src={updateOrder?.payment_status === "on hold" ? Warning : Check} width={150} height={150} alt="check" /> */}
            <i class={`bi bi-${updateOrder?.payment_status === "on hold" ? "exclamation-triangle": "check-circle"}-fill text-center`} style={{fontSize: "8rem", color: updateOrder?.payment_status === "on hold" ? "#ffc35a" : "#5FBB45"}}/>
            <div className="text-center mt-2">
              {updateOrder?.payment_status !== "on hold" &&  <h1>Thank you</h1>}
              <p style={{ fontSize: 20 }}>{updateOrder?.payment_status === "on hold" ? <span>Your payment is currently on hold for unspecified reasons.<br /> Please wait for approval of the transaction.</span> : "Your order has been received"}</p>
              <button
                className="thank-you-btn mt-2"
                onClick={() => navigate("/orders")}
              >
                Order History
              </button>
            </div>
          </>
        ) : (
          <Backdrop
            sx={{
              color: "#5ebb45",
              marginTop: -10,
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isLoadingUpdateOrder}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Row>
    </Container>
  );
}
