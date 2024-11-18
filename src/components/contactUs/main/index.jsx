import React, { useState, useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import contactUs from "../../../assets/contact-us.png";
import styles from "./styles.module.scss";
import { handleRequest } from "../../../helpers/helpers";
import GoogleMap from "../../common/googleMap";
import { IntlContext } from "../../../context/Internationalization";
import CaravanLocationImages from "./caravanLocationImages";

const ContactUs = ({page}) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [caravanImagesList, setCaravanImagesList] = useState([])
  const context = useContext(IntlContext);
  
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    getCaravanLocationImages();
  },[])

  const getCaravanLocationImages = async () => {
    try {
      const res = await handleRequest("get", "/caravan-location-images");
      if (res.status === 200) {
        setCaravanImagesList(res.data)
      }
    } catch (err) {
      console.log(err, "err==>");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const res = await handleRequest("post", "/support/contactUs", values);
      if (res.data.success) {
        setLoading(false);
        setValues({ name: "", email: "", description: "" });
        toast.success("Response received successfully");
      } else {
        setLoading(false);

        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err, "err");
      setLoading(false);
    }
  };
  const { name, email, description } = values;
  return (
    <div className={styles.wrapper} dir={context.state.locale === "sa" ? "rtl" : "ltr"}>
      <div className={styles.lts}>
        <div className={page === "gift" ? "" : "container"}>
          <div className="row">
            <div className="col-lg-6">
              <form onSubmit={handleSubmit}>
                <div className={styles.contact_form}>
                  <div className={styles.heading}><FormattedMessage id="Contact Us" /> </div>
                  <input
                    type="text"
                    placeholder= {context.state.locale === "sa" ? "اسم" : "Name"}
                    name="name"
                    minLength={3}
                    maxLength={40}
                    value={name}
                    required
                    className={context.state.locale === "sa" && "text-inherit"}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder={context.state.locale === "sa" ? "بريد إلكتروني" : "Email"}
                    maxLength={60}
                    name="email"
                    value={email}
                    required
                    className={context.state.locale === "sa" && "text-inherit"}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                  <textarea
                    rows={5}
                    placeholder={context.state.locale === "sa" ? "مالذي تريد قوله؟" : "what you wanna say?"}
                    name="description"
                    minLength={3}
                    maxLength={250}
                    value={description}
                    className={context.state.locale === "sa" && "text-inherit"}
                    required
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  ></textarea>
                  <button type="submit" disabled={loading}>
                    {loading ? <FormattedMessage id="Loading" /> : <FormattedMessage id="Submit" />}
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-6 justify-content-center mt-lg-0 mt-50">
            <div className={styles.headingMap}><FormattedMessage id="FIND DRB CARAVAN" /> </div>
            
            <div className="justify-content-center" style={{marginTop: -10}}>
              <div style={{height: "43vh"}}><GoogleMap location={{ lat: 31.503673, lng: 74.331678 }} /></div>
              <div>
              <CaravanLocationImages caravanImagesList={caravanImagesList} />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
