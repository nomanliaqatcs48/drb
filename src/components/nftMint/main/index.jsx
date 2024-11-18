import React, { useState, useRef, useEffect, useContext } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import BarChartIcon from "@mui/icons-material/BarChart";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadMetaDataOnIpfs,
  clearMetaData,
  hideLoading,
} from "../../../redux/actions/nft";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import StatsModal from "./statsModal";
import { mint } from "../../../utils/contract/mint";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import { isUserAlreadyAdded } from "../../../helpers/helpers";
import {
  validateMetamask,
  isMetaMaskInstalled,
  redirectToMetaMaskExtension,
} from "../../../helpers/web3";
import { network } from "../../../utils/data";
import { ENV } from "../../../config/config";


const NftMint = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(IntlContext);
  const hiddenFileInput = useRef(null);
  // const socket = useContext(SocketContext);
  const [modalType, setModalType] = useState("");
  const [src, setSrc] = useState(null);
  const [picture, setPicture] = useState();
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [statsValues, setStatsValues] = useState({
    properties: [{ trait_type: "", value: "" }],
    levels: [{ trait_type: "", value: 3, secondVal: 5 }],
    stats: [{ trait_type: "", value: 3, secondVal: 5, display_type: "number" }],
  });
  const [mintingSetps, setMintingSteps] = useState(1);
  const { isNFTMinting, metadata } = useSelector((state) => state.nft);
  const [loading, setLoading] = useState(false);
  console.log(isNFTMinting, metadata, "metaData=>");
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  useEffect(() => {
    handleMint();
  }, [metadata]);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  },[])

  const handleMint = async () => {
    try {
      if (metadata?.metaDataUrl) {
        setMintingSteps(2);
        dispatch(clearMetaData());
        const tx = await mint(
          metadata.data.supply,
          metadata?.metaDataUrl,
          setMintingSteps
        );
        dispatch(hideLoading());
        toast.success("NFT minted successfully");
        navigate("/explore");
      }
    } catch (err) {
      setMintingSteps(1);
      dispatch(hideLoading());
      console.log(err, "error==>");
    }
  };

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
  const onSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key) && values[key]) {
        formData.append(key, values[key]);
      }
    }
    for (const key in statsValues) {
      if (statsValues.hasOwnProperty(key)) {
        const attributes = statsValues[key].filter(
          (item) => item.trait_type.trim() !== "" && item.value
        );
        if (attributes.length > 0) {
          formData.append(key, JSON.stringify(attributes));
        }
      }
    }
    formData.append("picture", picture);

    if (isMetaMaskInstalled()) {
      const address = await validateMetamask(setLoading);
      if (address) {
        dispatch(uploadMetaDataOnIpfs(formData));
      }
      return;
    }
    toast.info("Please install metamask to continue");
    redirectToMetaMaskExtension();
    //validations
  };

  const showState = (title, description) => {
    return (
      <>
        <div
          className="mb-3 mt-4"
          dir={context.state.locale === "sa" ? "rtl" : "ltr"}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div>
                {title === "Properties" ? (
                  <FormatListBulletedIcon />
                ) : title === "Levels" ? (
                  <StarBorderPurple500Icon />
                ) : (
                  <BarChartIcon />
                )}
              </div>
              <div className="ml-2">
                <Form.Label>{<FormattedMessage id={title} />}</Form.Label>
                <p className="sub-label">
                  {<FormattedMessage id={description} />}
                </p>
              </div>
            </div>
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => setModalType(title.toLowerCase())}
            >
              +
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.lts}>
        <div className="container">
          <div
            className="row justify-content-md-center"
            dir={context.state.locale === "sa" ? "rtl" : "ltr"}
          >
            <div className="col-12 col-md-10 col-lg-6">
              <h1 className="text-center">
                <FormattedMessage id="Design your NFT" />
              </h1>
              <Formik
                initialValues={{
                  name: "",
                  external_link: "",
                  description: "",
                  supply: 1,
                  blockchain: network[ENV?.chainId],
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required("This field is required.").max(50),
                  external_link: Yup.string()
                    .matches(
                      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                      "Please enter correct url!"
                    )
                    .required("This field is required."),
                })}
                enableReinitialize
                onSubmit={(values) => {
                  onSubmit(values);
                  // handleReset()
                }}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleSubmit,
                    // handleReset,
                    setFieldValue,
                  } = props;
                  return (
                    <form className="new-form" onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-3 mt-5"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>
                          <FormattedMessage id="Image, Video, Audio, or 3D Model" />{" "}
                          *
                        </Form.Label>
                        <p className="sub-label">
                          <FormattedMessage id="File types supported: JPG, PNG, GIF, SVG, Max size: 100 MB" />
                        </p>
                        <div>
                          <div className={styles.upload} onClick={handleClick}>
                            <FormattedMessage id="Upload Image" />
                          </div>
                          {src && (
                            <img
                              src={src}
                              className="mb-2 ml-5 d-block"
                              accept="image/bmp, image/jpeg, image/png"
                              style={{
                                width: 100,
                                height: 100,
                                marginTop: 20,
                                border: "1px solid #e3e2e2",
                              }}
                              alt=""
                            />
                          )}
                        </div>

                        <input
                          type="file"
                          name="file"
                          className="d-none"
                          onChange={handlePictureSelected}
                          ref={hiddenFileInput}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>
                          <FormattedMessage id="Name" /> *
                        </Form.Label>
                        <Form.Control
                          size="lg"
                          type="text"
                          placeholder={
                            context.state.locale === "sa"
                              ? "اسم العنصر"
                              : "Item name"
                          }
                          name="name"
                          onChange={handleChange}
                          value={values.name}
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3 mt-4">
                        <Form.Label>
                          <FormattedMessage id="External link" /> *
                        </Form.Label>
                        <p className="sub-label">
                          <FormattedMessage id="OpenSea will include a link to this URL on this item's detail page so that users can click to learn more about it. You are welcome to link to your own webpage with more details." />
                        </p>
                        <Form.Control
                          size="lg"
                          type="text"
                          placeholder="https://yoursite.io/item/123"
                          name="external_link"
                          onChange={handleChange}
                          value={values.external_link}
                          isInvalid={!!errors.external_link}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.external_link}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3 mt-4">
                        <Form.Label>
                          <FormattedMessage id="Description" />
                        </Form.Label>
                        <p className="sub-label">
                          <FormattedMessage
                            id="The description will be included on the item's detail
                          page underneath its image. Markdown syntax is
                          supported."
                          />
                        </p>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder={
                            context.state.locale === "sa"
                              ? "قدم وصفا مفصلا للعنصر الخاص بك."
                              : "Provide a detailed description of your item."
                          }
                          name="description"
                          error={touched.description && errors.description}
                          helpertext={errors.description}
                          onChange={handleChange}
                          value={values.description}
                        />
                      </Form.Group>

                      {showState(
                        "Properties",
                        "Textual traits that show up as rectangles"
                      )}
                      <div className="d-flex">
                        {statsValues.properties.map(
                          (property, i) =>
                            property.trait_type &&
                            property.value && (
                              <div className="property" key={i}>
                                <div className="poperty-text">
                                  {property.trait_type}
                                </div>
                                <dv className="poperty-text">
                                  {property.value}
                                </dv>
                              </div>
                            )
                        )}
                      </div>
                      <hr />

                      {showState(
                        "Levels",
                        "Numerical traits that show as a progress bar"
                      )}
                      {statsValues.levels.map(
                        (level, i) =>
                          level.trait_type && (
                            <div className="stats-details" key={i}>
                              <div className="content">
                                <p>{level.trait_type}</p>
                                <p>
                                  {level.value} of {level.secondVal}
                                </p>
                              </div>
                            </div>
                          )
                      )}
                      <hr />
                      {showState(
                        "Stats",
                        "Numerical traits that just show as numbers"
                      )}
                      {statsValues.stats.map(
                        (stat, i) =>
                          stat.trait_type && (
                            <div className="stats-details" key={i}>
                              <div className="content">
                                <p>{stat.trait_type}</p>
                                <p>
                                  {stat.value} of {stat.secondVal}
                                </p>
                              </div>
                            </div>
                          )
                      )}
                      <hr />

                      <Form.Group className="mb-3 mt-4">
                        <Form.Label>
                          <FormattedMessage id="Supply" />
                        </Form.Label>
                        <p className="sub-label">
                          <FormattedMessage id="The number of items that can be minted. No gas cost to you!" />
                        </p>
                        <Form.Control
                          size="lg"
                          type="numbers"
                          placeholder="Supply"
                          name="supply"
                          error={touched.supply && errors.supply}
                          helpertext={errors.supply}
                          onChange={handleChange}
                          value={values.supply}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 mt-4">
                        <Form.Label>
                          <FormattedMessage id="Blockchain" />
                        </Form.Label>

                        <Form.Select
                          size="lg"
                          onChange={handleChange}
                          value={values.blockchain}
                        >
                          <option value={network[ENV?.chainId]}>{network[ENV?.chainId]}</option>
                        </Form.Select>
                      </Form.Group>
                      <Button
                        variant="contained"
                        className="w-100 mt-4"
                        size="large"
                        type="submit"
                        disabled={loading}
                        style={context.state.locale === "sa" ? {fontFamily: 'Noto Naskh Arabic'}: {}}
                      >
                        <FormattedMessage id="Create" />
                      </Button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{
          color: "#5ebb45",
          marginTop: -46,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isNFTMinting}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <CircularProgress className="text-white" />
          <p className="mt-3 text-white">
            {mintingSetps === 1
              ? "Uploading metadata on IPFS....!"
              : mintingSetps === 2
              ? "Waiting for transaction approval...!"
              : "Transaction is inProgress,Please wait.....!"}
          </p>
        </div>
      </Backdrop>

      {modalType && (
        <StatsModal
          modalType={modalType}
          onCloseModal={() => setModalType("")}
          statsValues={statsValues}
          setStatsValues={(name, values) =>
            setStatsValues({ ...statsValues, [name]: values })
          }
        />
      )}
    </div>
  );
};

export default NftMint;
