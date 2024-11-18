import React, { useState, useEffect, useRef, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import DummyUser from "../../../assets/profileImage.png";
import ProfileFemaleIcon from "../../../assets/profileFemaleIcon.png";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../../redux/actions/user";
import TextField from "@mui/material/TextField";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { isMobile } from "react-device-detect";
import ShippingForm from "../../common/shippingForm";
import BillingForm from "../../common/billingForm";

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

const Profile = () => {
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const [src, setSrc] = useState(null);
  const [picture, setPicture] = useState();
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [userData, setUserData] = useState({});
  const [shippingInfoObj, setShippingInfoObj] = useState(null);
  const [billingInfoObj, setBillingInfoObj] = useState(null);
  const [isSameShippingAddress, setIsSameShippingAddress] = useState(false);

  const context = useContext(IntlContext);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const shippingAddress = localStorage.getItem("isSameShippingAddress");
    if (shippingAddress) {
      setIsSameShippingAddress(JSON.parse(shippingAddress));
    }
  }, [userInfo]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    const user = {
      firstName: userInfo?.userName?.split(" ")[0] || "",
      lastName: userInfo?.userName?.split(" ")[1] || "",
      email: userInfo?.email || "",
      lang: userInfo?.lang || "",
      gender: userInfo?.gender || "male",
      profileImg: userInfo?.profileImg || "",
      shippingInfo: userInfo?.shippingInfo || {},
      billingInfo: userInfo?.billingInfo || {},
    };
    setBillingInfoObj(userInfo?.billingInfo || null);
    setShippingInfoObj(userInfo?.shippingInfo || null);
    setUserData(user);
  }, [userInfo]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handlePictureSelected = (event) => {
    var allowedExtensions = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/bmp",
    ];
    var uploadPicture = event.target.files[0];
    if (!allowedExtensions.includes(uploadPicture.type)) {
      toast.error("Invalid file type");
      return false;
    }
    var imgSrc = URL.createObjectURL(uploadPicture);
    setSrc(imgSrc);
    setPicture(uploadPicture);
    setIsUploadFile(true);
  };
  // const InputField = ({
  //   label,
  //   name,
  //   error,
  //   helperText,
  //   onChange,
  //   value,
  //   type = "text",
  //   readOnly = false,
  // }) => {
  //   return (
  //     <>
  //       <label className="input-label">
  //         <FormattedMessage id={label} />
  //       </label>
  //       <div dir={name === "address_postal_code" && "ltr"}>
  //         <TextField
  //           type={type}
  //           size="medium"
  //           name={name}
  //           variant="outlined"
  //           className="w-100 mt-2"
  //           error={error}
  //           helperText={error ? helperText : ""}
  //           onChange={onChange}
  //           value={value}
  //           readOnly={readOnly}
  //         />
  //       </div>
  //     </>
  //   );
  // };

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

  return (
    <div
      className={"main-wrapper"}
      dir={context.state.locale === "sa" ? "rtl" : "ltr"}
    >
      <div className="container profile-wrapper">
        <div className="row">
          <h3 className={styles.heading}>
            <FormattedMessage id="Profile" />
          </h3>
          <div className="col-lg-12">
            <Formik
              initialValues={{
                firstName: userData?.firstName || "",
                lastName: userData?.lastName || "",
                email: userData?.email || "",
                lang: userData?.lang || "en",
                gender: userData?.gender || "male",
                shipping: {
                  firstName: shippingInfoObj?.first_name || "",
                  lastName: shippingInfoObj?.last_name || "",
                  email: shippingInfoObj?.email || "",
                  phone: shippingInfoObj?.phone || "",
                  address: shippingInfoObj?.address || "",
                  state: shippingInfoObj?.state || "",
                  city: shippingInfoObj?.city || "",
                  country: shippingInfoObj?.country || "",
                  postalCode: parseInt(shippingInfoObj?.postalCode) || "",
                },
                billing: {
                  firstName: isSameShippingAddress
                    ? shippingInfoObj?.first_name
                    : billingInfoObj?.first_name || "",
                  lastName: isSameShippingAddress
                    ? shippingInfoObj?.last_name
                    : billingInfoObj?.last_name || "",
                  email: isSameShippingAddress
                    ? shippingInfoObj?.email
                    : billingInfoObj?.email || "",
                  phone: isSameShippingAddress
                    ? shippingInfoObj?.phone
                    : billingInfoObj?.phone || "",
                  address: isSameShippingAddress
                    ? shippingInfoObj?.address
                    : billingInfoObj?.address || "",
                  state: isSameShippingAddress
                    ? shippingInfoObj?.state
                    : billingInfoObj?.state || "",
                  city: isSameShippingAddress
                    ? shippingInfoObj?.city
                    : billingInfoObj?.city || "",
                  country: isSameShippingAddress
                    ? shippingInfoObj?.country
                    : billingInfoObj?.country || "",
                  postalCode: isSameShippingAddress
                    ? shippingInfoObj?.postalCode
                    : billingInfoObj?.postalCode || "",
                },
              }}
              validationSchema={Yup.object({
                firstName: Yup.string()
                  .required("This field is required.")
                  .max(50),
                lastName: Yup.string().max(50),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("This field is required."),
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
                const {
                  firstName,
                  lastName,
                  email,
                  lang,
                  gender,
                  shipping,
                  billing,
                } = values;

                const {
                  phone,
                  address,
                  city,
                  country,
                  state,
                  postalCode,
                } = shipping;

                const shippingInfo = {
                  first_name: shipping.firstName,
                  last_name: shipping.lastName,
                  email: shipping.email,
                  phone,
                  address,
                  city,
                  country,
                  state,
                  postalCode: parseInt(postalCode),
                };

                const billingInfo = {
                  first_name: billing.firstName,
                  last_name: billing.lastName,
                  email: billing.email,
                  phone: billing.phone,
                  address: billing.address,
                  city: billing.city,
                  country: billing.country,
                  state: billing.state,
                  postalCode: parseInt(billing.postalCode),
                };
                var formData = new FormData();
                formData.append("userName", `${firstName} ${lastName}`);
                formData.append("email", email);
                formData.append("lang", lang);
                formData.append("gender", gender);

                picture && formData.append("profileImg", picture);
                formData.append("shippingInfo", JSON.stringify(shippingInfo));
                formData.append("billingInfo", JSON.stringify(billingInfo));
                dispatch(updateUser(formData));
              }}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                } = props;
                return (
                  <form className="new-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="mb-5 mt-1">
                          <div
                            href=""
                            style={{
                              position: "relative",
                              display: "inline-flex",
                            }}
                          >
                            <img
                              src={
                                src
                                  ? src
                                  : userInfo?.profileImg
                                  ? userInfo?.profileImg
                                  : userInfo?.gender === "female"
                                  ? ProfileFemaleIcon
                                  : DummyUser
                              }
                              className="mb-2 ml-5"
                              accept="image/bmp, image/jpeg, image/png"
                              style={{
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                objectFit: "contain",
                                border: "1px solid #e7e7e7",
                              }}
                              alt=""
                            />
                            <EditCalendarIcon
                              size={24}
                              style={{
                                position: "absolute",
                                top: 6,
                                right: 27,
                                zIndex: 1,
                                cursor: "pointer",
                              }}
                              onClick={handleClick}
                            />
                          </div>

                          <input
                            type="file"
                            name="file"
                            className="d-none"
                            onChange={handlePictureSelected}
                            ref={hiddenFileInput}
                          />
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <InputField
                          label="First Name"
                          placeholder="Please input your first name"
                          name="firstName"
                          size="small"
                          error={touched.firstName && errors.firstName}
                          helperText={errors.firstName}
                          onChange={handleChange}
                          value={values.firstName}
                        />
                        <InputField
                          label="Last Name"
                          placeholder="Please input your last name"
                          name="lastName"
                          size="small"
                          error={touched.lastName && errors.lastName}
                          helperText={errors.lastName}
                          onChange={handleChange}
                          value={values.lastName}
                        />
                        <InputField
                          label="Email"
                          type="email"
                          placeholder="Please input your email"
                          readOnly={true}
                          size="small"
                          name="email"
                          error={touched.email && errors.email}
                          helperText={errors.email}
                          onChange={handleChange}
                          value={values.email}
                        />
                        <label className="input-label">
                          <FormattedMessage id="Preference Language" />
                        </label>
                        <div>
                          <Select
                            name="lang"
                            className="w-100"
                            size="small"
                            value={values.lang}
                            onChange={handleChange}
                          >
                            <MenuItem value="en">
                              <FormattedMessage id={"English"} />
                            </MenuItem>
                            <MenuItem value="sa">
                              <FormattedMessage id={"Arabic"} />
                            </MenuItem>
                          </Select>
                        </div>
                        <label className="input-label">
                          <FormattedMessage id="Gender" />
                        </label>
                        <div>
                          <Select
                            name="gender"
                            size="small"
                            className="w-100"
                            value={values.gender}
                            onChange={handleChange}
                          >
                            <MenuItem value="male">
                              <FormattedMessage id={"Male"} />
                            </MenuItem>
                            <MenuItem value="female">
                              <FormattedMessage id={"Female"} />
                            </MenuItem>
                            <MenuItem value="other">
                              <FormattedMessage id={"Other"} />
                            </MenuItem>
                          </Select>
                        </div>
                      </div>
                      <ShippingForm
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        values={values}
                        InputField={InputField}
                        setFieldValue={setFieldValue}
                        billingInfo={userData?.billingInfo || null}
                        isSameShippingAddress={isSameShippingAddress}
                        setIsSameShippingAddress={(val) =>
                          setIsSameShippingAddress(val)
                        }
                      />

                      {!isSameShippingAddress && (
                        <BillingForm
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                          values={values}
                          InputField={InputField}
                          setFieldValue={setFieldValue}
                        />
                      )}
                      <Button
                        variant="contained"
                        className={`${
                          isMobile ? "w-50" : "w-25"
                        } mt-4 ml-auto d-block`}
                        size="large"
                        type="submit"
                      >
                        <FormattedMessage id="Save" />
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
