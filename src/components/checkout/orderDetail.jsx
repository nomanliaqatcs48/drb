import React, { useContext } from "react";
import { IntlContext } from "../../context/Internationalization";
import { FormattedMessage } from "react-intl";

const PersonalInfoForm = ({ cartItems, totalPrice }) => {
  const context = useContext(IntlContext);
  const ShowDetail = ({ title, price, name, gift_wrap_title, gift_wrap_price }) => {
    return (
      <>
      <div className="d-flex mb-3">
        <div style={{ color: "gray" }}>
          {name === "title" ? title : <FormattedMessage id={title} />}
        </div>
        <div className={context.state.locale === "sa" ? "mr-auto" : "ml-auto"}>
          <b>{price}</b>
        </div>
      </div>
      {gift_wrap_price && (
        <div className="d-flex mb-3">
        <div style={{ color: "gray" }}>
          {gift_wrap_title}
        </div>
        <div className={context.state.locale === "sa" ? "mr-auto" : "ml-auto"}>
          <b>{gift_wrap_price}</b>
        </div>
      </div>
      )}
      
      </>
    );
  };

  return (
    <div>
      <h5 className="mb-4">
        <FormattedMessage id="Order Detail" />
      </h5>
      {cartItems?.items &&
        cartItems.items.map((item) => (
          <ShowDetail
            title={`${item.quantity} x ${item.productInfo.name}`}
            price={`SR ${(
              parseFloat(item.productInfo.unit_price) * item.quantity
            ).toFixed(2)}`}
            name="title"
            gift_wrap_title={`${item.quantity} x Gift wrap`}
            gift_wrap_price={item?.gift_wrap?.price ? `SR ${(
              parseFloat(item?.gift_wrap?.price) * item.quantity
            ).toFixed(2)}`: ""}
          />
        ))}
      <hr className="mt-3 mb-4" />
      <ShowDetail title="Subtotal" price={`SR ${totalPrice}`} />
      {/* <ShowDetail title="Shipping:" price="$900" /> */}
      <ShowDetail title="Tax" price="-" />
      <ShowDetail title="Discount" price="-" />

      <hr className="mt-3 mb-4" />

      <ShowDetail title="Total" price={`SR ${totalPrice}`} />
    </div>
  );
};

export default PersonalInfoForm;
