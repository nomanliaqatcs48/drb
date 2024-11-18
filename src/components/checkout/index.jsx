import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { checkoutOrder, getOrderDetail } from "../../redux/actions/product";
import { getUser, updateUser } from "../../redux/actions/user";
import PersonalInfoForm from "./PersonalInfoForm";
import OrderDetail from "./orderDetail";
import Container from "react-bootstrap/Container";
import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import cross from "../../assets/cross.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingButton from "@mui/lab/LoadingButton";
import { IntlContext } from "../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import { isMobile } from "react-device-detect";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { setOrderCancellation } from "../../redux/actions/order";
import SVGS from "../../assets/svg";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CheckoutButton = styled(LoadingButton)(() => ({
  backgroundColor: "#4f489e",
  "&:hover": {
    backgroundColor: "#4f489e",
  },
}));

export default function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(IntlContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [billingInfo, setBillingInfo] = useState(null);
  const [isEdit, setIsEdit] = useState(true);
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);

  const { cartItems, isCheckoutLoading, orderDetails } = useSelector(
    (state) => state.product
  );

  const { isCancellationOrder } = useSelector((state) => state.order);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.shippingInfo) {
      setShippingInfo(userInfo?.shippingInfo);
      setBillingInfo(userInfo?.billingInfo || null);
    }
  }, [userInfo]);

  // useEffect(() => {
  //   if (cartItems?.length === 0 || cartItems?.items?.length === 0) {
  //     navigate("/products")
  //   }
  // }, [cartItems]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const url = new URL(window.location.href);
    setIsDisabledBtn(url.searchParams.has("tap_id"));

    dispatch(getOrderDetail("checkout"));
    dispatch(getUser());
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (isCancellationOrder) {
      setTimeout(() => {
        // navigate("/checkout");
        setIsDisabledBtn(false);
        dispatch(setOrderCancellation(false));
      }, 4000);
    }
  }, [isCancellationOrder]);

  const totalPrice = () => {
    let giftWrapPrice = 0;
    let price = 0;
    price =
      cartItems?.items.length > 0 &&
      cartItems?.items
        .reduce(function (accumulator, curValue) {
          return (
            accumulator +
            parseFloat(curValue.productInfo.unit_price) * curValue.quantity
          );
        }, 0)
        .toFixed(2);

    const giftWraps = cartItems?.items.filter((item) => item?.gift_wrap);
    if (giftWraps.length > 0) {
      giftWrapPrice = giftWraps
        .reduce(function (accumulator, curValue) {
          return (
            accumulator +
            parseFloat(curValue?.gift_wrap?.price || 0) * curValue.quantity
          );
        }, 0)
        .toFixed(2);
    }
    return (parseFloat(price) + parseFloat(giftWrapPrice)).toFixed(2) || 0;
  };

  const placeOrder = async () => {
    if (!shippingInfo) {
      setIsOpenModal(true);
      return;
    }
    const {
      first_name,
      last_name,
      email,
      phone,
    } = shippingInfo;
    let parmas;
    if (isEdit) {
      parmas = {
        userId: cartItems.userId,
        shippingInformation:shippingInfo,
        billingInformation:billingInfo,
        cartId: cartItems._id,
        status: "pending",
        defaultInfo: false,
        total_amount: parseFloat(totalPrice()),
      };
    } else {
      parmas = {
        userId: cartItems.userId,
        cartId: cartItems._id,
        status: "pending",
        defaultInfo: true,
        total_amount: parseFloat(totalPrice()),
      };
    }

    const lineItems = cartItems?.items?.map((item) => {
      const obj = {
        productId: parseInt(item.productId),
        quantity: item.quantity,
      };
      if (item.gift_wrap) {
        obj["gift_wrap"] = item.gift_wrap;
      }
      return obj;
    });

    const paymentData = {
      cartId: cartItems._id,

      userId: cartItems.userId,
      customer: {
        first_name,
        last_name,
        email,
        phone: {
          country_code: "",
          number: phone,
        },
      },
      items: lineItems,
    };
    window.fbq("track", "InitiateCheckout", {
      value: totalPrice(),
      currency: "SAR",
    });
    dispatch(checkoutOrder(parmas, paymentData));
  };

  return (
    <Container style={{ paddingBlock: isMobile ? "10px 40px" : "100px" }}>
      {cartItems?.items?.length > 0 ? (
        <Row
          className="justify-content-md-center"
          dir={context.state.locale === "sa" ? "rtl" : "ltr"}
        >
          <Col xs={12} md={8}>
            <Modal
              show={isOpenModal}
              onHide={() => setIsOpenModal(false)}
              centered
              className={styles.modal_wrap}
            >
              <Modal.Body>
                <div
                  className={styles.cross}
                  style={
                    context.state.locale === "sa"
                      ? { top: 10, right: 10 }
                      : { top: 14, right: 18 }
                  }
                  onClick={() => setIsOpenModal(false)}
                >
                  <img src={cross} alt="cross" />
                </div>
                <PersonalInfoForm
                  cartItems={cartItems}
                  checkoutOrder={(data) => {
                    var formData = new FormData();
                    formData.append("shippingInfo", JSON.stringify(data.shippingInfo));
                    formData.append("billingInfo", JSON.stringify(data.billingInfo));
                    dispatch(updateUser(formData, "checkout"));
                    setShippingInfo(data.shippingInfo);
                    setBillingInfo(data.billingInfo);
                    setIsOpenModal(false);
                    setIsEdit(true);
                  }}
                  totalPrice={totalPrice()}
                  isCheckoutLoading={isCheckoutLoading}
                  shippingInfo={shippingInfo || {}}
                  billingInfo={billingInfo || {}}
                  orderDetails={orderDetails}
                  isOpenModal={isOpenModal}
                />
              </Modal.Body>
            </Modal>
            <Card>
              <CardContent>
                <Col md={12} className="mt-1">
                  <div className="d-flex">
                    <div>
                      <h4>
                        <FormattedMessage id="Shipping Address" />
                      </h4>
                    </div>
                    <div
                      className={
                        context.state.locale === "sa" ? "mr-auto" : "ml-auto"
                      }
                    >
                      <Button
                        variant="outlined"
                        onClick={() => setIsOpenModal(true)}
                      >
                        {shippingInfo &&
                        shippingInfo.hasOwnProperty("first_name") ? (
                          <FormattedMessage id="Edit" />
                        ) : (
                          <FormattedMessage id="Add New" />
                        )}{" "}
                        {!isMobile && <FormattedMessage id="Address" />}
                      </Button>
                    </div>
                  </div>
                </Col>

                <Col sm={12} md={4}>
                  {shippingInfo?.first_name && (
                    <div
                      className={`shippind-address mt-3  ${
                        context.state.locale === "sa" && "text-right"
                      }`}
                    >
                      {shippingInfo?.first_name} {shippingInfo?.last_name}{" "}
                      <br />
                      {shippingInfo?.address} {shippingInfo?.city},{" "}
                      {shippingInfo?.state}, {shippingInfo?.country}{" "}
                      {shippingInfo?.postalCode}
                      <br />
                      {shippingInfo?.phone}
                    </div>
                  )}
                </Col>
                {billingInfo?.first_name && (
                  <Col sm={12} md={4}>
                    <h4 className="mt-3">
                      <FormattedMessage id="Billing Address" />
                    </h4>
                    {billingInfo?.first_name && (
                      <div
                        className={`shippind-address mt-3  ${
                          context.state.locale === "sa" && "text-right"
                        }`}
                      >
                        {billingInfo?.first_name} {billingInfo?.last_name}{" "}
                        <br />
                        {billingInfo?.address} {billingInfo?.city},{" "}
                        {shippingInfo?.state}, {billingInfo?.country}{" "}
                        {billingInfo?.postalCode}
                        <br />
                        {billingInfo?.phone}
                      </div>
                    )}
                  </Col>
                )}
                <Col sm={12} md={12} className="text-end">
                  <CheckoutButton
                    type="button"
                    variant="contained"
                    className="checkout-btn mt-4 mb-2"
                    loading={isCheckoutLoading}
                    disabled={isCheckoutLoading || isDisabledBtn}
                    onClick={() => placeOrder()}
                  >
                    <span>
                      <FormattedMessage id="Checkout" />
                    </span>
                  </CheckoutButton>
                </Col>
                <Backdrop
                  sx={{
                    color: "#5ebb45",
                    marginTop: -10,
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={isCheckoutLoading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                {isDisabledBtn && (
                  <h2
                    style={{ color: "#4f489e", margin: "20px 0px" }}
                    id="order-message"
                  />
                )}
              </CardContent>
            </Card>
          </Col>
          <Col xs={12} md={4} className={isMobile && "mt-4"}>
            {cartItems?.items && (
              <OrderDetail cartItems={cartItems} totalPrice={totalPrice()} />
            )}
          </Col>
          <Dialog
            open={isCancellationOrder}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {}}
            aria-describedby="alert-dialog-slide-description"
            style={{ marginTop: "-15%" }}
          >
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                className="text-center"
              >
                <div className="mt-3">
                  <SVGS.CrossMarkSvg />
                </div>
                <h2 className="m-3">
                  {"Something went wrong! Your payment is failed"}!
                </h2>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Row>
      ) : (
        !isCheckoutLoading && (
          <div className={styles.textVerticalCenter}>
            <div className={styles.text}>Your shopping bag is empty.</div>
            <CheckoutButton
              type="button"
              variant="contained"
              className="checkout-btn"
              onClick={() => navigate("/souvenirs")}
            >
              CONTINUE SHOPPING
            </CheckoutButton>
          </div>
        )
      )}
    </Container>
  );
}
