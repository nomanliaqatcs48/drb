import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import "react-phone-input-2/lib/material.css";
import { IntlContext } from "../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import ShippingForm from "../common/shippingForm";
import BillingForm from "../common/billingForm";

const billingAddressSchema = () => {
  return Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("This field is required."),
    phone: Yup.string().required("This field is required."),
    address: Yup.string().required("This field is required."),
    state: Yup.string().required("This field is required."),
    city: Yup.string().required("This field is required."),
    country: Yup.string().required("This field is required."),
    postalCode: Yup.string().required("This field is required."),
  });
};

const CheckoutButton = styled(LoadingButton)(() => ({
  backgroundColor: "#4f489e",
  "&:hover": {
    backgroundColor: "#4f489e",
  },
}));

const PersonalInfoForm = ({
  cartItems,
  checkoutOrder,
  isCheckoutLoading,
  shippingInfo,
  billingInfo,
  isOpenModal
}) => {
  const context = useContext(IntlContext);
  const [personalInfo, setPersonalInfo] = useState({});
  const [billingInfoObj, setBillingInfoObj] = useState({});
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const [isSameShippingAddress, setIsSameShippingAddress] = useState(false);

  useEffect(() => {
    const shippingAddress = localStorage.getItem("isSameShippingAddress");
    if(shippingAddress){
      setIsSameShippingAddress(JSON.parse(shippingAddress));
    }
    
  },[isOpenModal])
  const InputField = ({
    label,
    name,
    error,
    helperText,
    onChange,
    value,
    type = "text",
  }) => {
    return (
      <div className="mt-3">
        <label className="">
          <FormattedMessage id={label} />
        </label>
        <div dir={name === "postalCode" && "ltr"}>
          <TextField
            type={type}
            size="small"
            name={name}
            variant="outlined"
            className="w-100 mt-1"
            error={error}
            helperText={helperText}
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    setIsDisabledBtn(url.searchParams.has("tap_id"));
  }, []);

  useEffect(() => {
    setPersonalInfo(shippingInfo);
    setBillingInfoObj(billingInfo);
  }, [shippingInfo, billingInfo]);

  return (
    <div className="p-2" dir={context.state.locale === "sa" ? "rtl" : "ltr"}>
      <h5 className={context.state.locale === "sa" ? "mt-4" : ""}>
        {personalInfo?.hasOwnProperty("first_name") ? (
          <FormattedMessage id="Edit" />
        ) : (
          <FormattedMessage id="Add New" />
        )}{" "}
        <FormattedMessage id="Address Information" />
      </h5>
      <Formik
        initialValues={{
          shipping: {
            firstName: personalInfo?.first_name || "",
            lastName: personalInfo?.last_name || "",
            email: personalInfo?.email || "",
            phone: personalInfo?.phone || "",
            address: personalInfo?.address || "",
            state: personalInfo?.state || "",
            city: personalInfo?.city || "",
            country: personalInfo?.country || "",
            postalCode: personalInfo?.postalCode || "",
          },

          isSameAddress: isSameShippingAddress || false,

          billing: {
            firstName: isSameShippingAddress ? personalInfo?.first_name  : billingInfoObj?.first_name || "",
            lastName: isSameShippingAddress ? personalInfo?.last_name  : billingInfoObj?.last_name || "",
            email: isSameShippingAddress ? personalInfo?.email : billingInfoObj?.email || "",
            phone: isSameShippingAddress ? personalInfo?.phone : billingInfoObj?.phone || "",
            address: isSameShippingAddress ? personalInfo?.address : billingInfoObj?.address || "",
            state: isSameShippingAddress ? personalInfo?.state : billingInfoObj?.state || "",
            city: isSameShippingAddress ? personalInfo?.city : billingInfoObj?.city || "",
            country: isSameShippingAddress ? personalInfo?.country : billingInfoObj?.country || "",
            postalCode: isSameShippingAddress ? personalInfo?.postalCode : billingInfoObj?.postalCode || "",
          },
        }}
        validationSchema={Yup.object({
          shipping: Yup.object().shape({
            firstName: Yup.string().required("This field is required."),
            lastName: Yup.string().required("This field is required."),
            email: Yup.string()
              .email("Invalid email address")
              .required("This field is required."),
            phone: Yup.string().required("This field is required."),
            address: Yup.string().required("This field is required."),
            state: Yup.string().required("This field is required."),
            city: Yup.string().required("This field is required."),
            country: Yup.string().required("This field is required."),
            postalCode: Yup.string().required("This field is required."),
          }),
          billing: billingAddressSchema(false).when('isSameShippingAddress', {
            is: false,
            then: (schema) => schema, // Returns addressSchema with required 
            otherwise: (schema) => schema.default(undefined), 
          }),
        })}
        enableReinitialize
        onSubmit={(values) => {
          const {shipping, billing} = values;
          const parmas = {
            userId: cartItems.userId,
            shippingInfo: {
              first_name: shipping.firstName,
              last_name: shipping.lastName,
              email: shipping.email,
              phone: shipping.phone,
              address: shipping.address,
              state: shipping.state,
              city: shipping.city,
              country: shipping.country,
              postalCode: parseInt(shipping.postalCode),
            },
            billingInfo: {
              first_name: billing.firstName,
              last_name: billing.lastName,
              email: billing.email,
              phone: billing.phone,
              address: billing.address,
              state: billing.state,
              city: billing.city,
              country: billing.country,
              postalCode: parseInt(billing.postalCode),
            },
            
            cartId: cartItems._id,
            status: "pending",
            // items,
          };

          const lineItems = cartItems?.items?.map((item) => {
            return {
              productId: parseInt(item.productId),
              quantity: item.quantity,
            };
          });

          const paymentData = {
            cartId: cartItems._id,

            userId: cartItems.userId,
            customer: {
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
              phone: {
                country_code: "",
                number: values.phone,
              },
            },
            items: lineItems,
          };

          checkoutOrder(parmas, paymentData);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            // handleReset,
            setFieldValue,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div
                className={
                  context.state.locale === "sa" ? "text-end" : "text-start"
                }
              >
                <h5 className="mt-4 mb-1">Shipping Address</h5>
                <ShippingForm
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  values={values}
                  InputField={InputField}
                  setFieldValue={setFieldValue}
                  billingInfo={billingInfoObj}
                  setIsSameShippingAddress={(val) => setIsSameShippingAddress(val)}
                  isSameShippingAddress={isSameShippingAddress}
                />
                {!isSameShippingAddress && (
                  <>
                    <hr />
                    <h5>Billing Address</h5>
                    <BillingForm
                      touched={touched}
                      errors={errors}
                      handleChange={handleChange}
                      values={values}
                      InputField={InputField}
                      setFieldValue={setFieldValue}
                    />
                  </>
                )}{" "}
                <CheckoutButton
                  type="submit"
                  variant="contained"
                  className="checkout-btn mt-4 mb-2"
                  // loading={isCheckoutLoading}
                  disabled={isCheckoutLoading || isDisabledBtn}
                >
                  <span>
                    <FormattedMessage id="Save" />
                  </span>
                </CheckoutButton>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalInfoForm;
