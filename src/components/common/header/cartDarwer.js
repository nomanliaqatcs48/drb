import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { BoxSvg } from "../../../assets/box";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItem, removeCartItem } from "../../../redux/actions/product";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";

const CheckoutButton = styled(Button)(() => ({
  backgroundColor: "#4f489e",
  "&:hover": {
    backgroundColor: "#4f489e",
  },
}));
const CartButton = styled(Button)(() => ({
  borderColor: "#4f489e",
  color: "#4f489e",
}));

let timer;

const debounce = function (fn, d) {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(fn, d);
};

export default function CartDarwer({ isOpenDrawer, onClose, cartItems }) {
  const context = useContext(IntlContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateQty = (product, action) => {
    const findIndex = cartItems.items.findIndex(
      (item) => item._id === product._id
    );
    let qty = selectedItems[findIndex].quantity;
    if (action === "add") {
      qty = qty + 1;
      selectedItems[findIndex].quantity = qty;
    } else {
      if (qty > 1) {
        qty = qty - 1;
        selectedItems[findIndex].quantity = qty;
      }
    }

    setSelectedItems([...selectedItems]);

    debounce(async () => {
      dispatch(
        updateCartItem({
          productId: product.productId,
          id: cartItems._id,
          quantity: qty,
        })
      );
    }, 1000);
  };

  useEffect(() => {
    setSelectedItems(cartItems.items);
  }, [cartItems]);

  const removeCart = (product) => {
    const index = selectedItems.findIndex(
      (item) => item.productId === product.productId
    );
    if (index > -1) {
      selectedItems.splice(index, 1);
      setSelectedItems([...selectedItems]);
      dispatch(
        removeCartItem({
          productId: product.productId,
          id: cartItems._id,
        })
      );
    }
  };

  const totalItemPrice = (item) => {
    let price = parseFloat(item.productInfo.unit_price) * item.quantity;
    if (item?.gift_wrap) {
      price += parseFloat(item.gift_wrap.price) * item.quantity;
    }
    return price.toFixed(2);
  };

  const totalPrice = () => {
    let giftWrapPrice = 0;
    let price = 0;
    price = selectedItems
      .reduce(function (accumulator, curValue) {
        return (
          accumulator +
          parseFloat(curValue.productInfo.unit_price) * curValue.quantity
        );
      }, 0)
      .toFixed(2);

    const giftWraps = selectedItems.filter((item) => item?.gift_wrap);
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

    return (parseFloat(price) + parseFloat(giftWrapPrice)).toFixed(2);
  };

  return (
    <SwipeableDrawer
      style={{ zIndex: 1250 }}
      anchor={context.state.locale === "sa" ? "left" : "right"}
      open={isOpenDrawer}
      onClose={onClose}
      onOpen={() => {}}
    >
      <div
        className="drawer-main"
        dir={context.state.locale === "sa" ? "rtl" : "ltr"}
      >
        <div className="drawer-content">
          <div style={{ borderBottom: "1px solid #f3f5f9" }}>
            <div className="drawer-header">
              <div>
                <BoxSvg />
                <span className="m-2">
                  {cartItems?.items?.length || 0}{" "}
                  <FormattedMessage id="Items" />
                </span>
              </div>
              <div>
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          </div>
          {selectedItems?.length > 0 ? (
            selectedItems?.map((item, i) => (
              <div className="items" key={i}>
                <div className="qty-btn">
                  <div
                    className="action-btn"
                    id="plus"
                    onClick={() => updateQty(item, "add")}
                  />

                  <div className="m-1">{item.quantity}</div>
                  <div
                    className="action-btn"
                    id="minus"
                    onClick={() => updateQty(item, "negative")}
                  />
                </div>
                <div className="cart-avatar">
                  <img
                    src={
                      item?.productInfo?.ProductImage?.length > 0
                        ? `https://drbdesignksa.daftra.com/${item?.productInfo?.ProductImage[0].file_full_path}`
                        : item.productInfo?.ProductImageS3?.length > 0 &&
                          item.productInfo.ProductImageS3[0].file_full_path
                    }
                    alt={item.productInfo.name}
                    className={"product-img"}
                  />
                </div>
                <div className="product-detail">
                  <h5 className="product-title" ellipsis="1">
                    {item.productInfo.name}
                  </h5>
                  <small className="product-price">
                    {parseFloat(item.productInfo.unit_price).toFixed(2)} x{" "}
                    {item.quantity} {" = "} SR{" "}
                    {(
                      parseFloat(item.productInfo.unit_price) * item.quantity
                    ).toFixed(2)}
                  </small>
                  {item?.gift_wrap && (
                    <p className="mt-0 mb-0">
                      <small className="product-price">
                        Gift wrap:{" "}
                        {parseFloat(item?.gift_wrap?.price).toFixed(2)} x{" "}
                        {item.quantity} {" = "} SR{" "}
                        {(
                          parseFloat(item?.gift_wrap?.price) * item.quantity
                        ).toFixed(2)}
                      </small>
                    </p>
                  )}
                  <div className="MuiBox-root css-x0tpko">
                    SR {totalItemPrice(item)}
                  </div>
                </div>
                <div>
                  <IconButton onClick={() => removeCart(item)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <h6 className="text-center mt-5">
              <FormattedMessage id="Your shopping bag is empty" />.
            </h6>
          )}
        </div>
        {selectedItems?.length > 0 && (
          <div className="p-4 drawer-checkout-btn">
            <CheckoutButton
              variant="contained"
              className="w-100 mb-2"
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            >
              <FormattedMessage id="Checkout Now" /> (SR {totalPrice()})
            </CheckoutButton>
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );
}
