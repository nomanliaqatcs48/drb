import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { handleRequest } from "../../../helpers/helpers";
import { toast } from "react-toastify";
import SVGS from "../../../assets/svg";
import Images from "../../../assets/images";
import PartnerLogo from "../../../assets/partner_logo.png";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

export default function Footer() {

  const { homePageContent } = useSelector((state: any) => state.content);

  const [email, setEmail] = useState("");
  const context = useContext(IntlContext);
  const handleSubscription = async () => {
    try {
      setEmail("");
      return toast.info("Credentials misssing");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return toast.error("Please enter a valid email");
      }
      const res = await handleRequest("post", "/user/subscribe", { email });
      if (res.data.success) {
        toast.success("Email subscribed successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {}
  };

  const handleSocialMedia = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div
      className="text-center text-lg-start text-muted"
      style={{
        backgroundImage: `url(${Images.bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div>
        <section
          className="container"
          dir={context.state.locale === "sa" ? "rtl" : "ltr"}
        >
          <div className="text-center text-md-start">
            <div className={styles.fwrap} style={context.state.locale === "sa" ? {textAlign: 'center'}: {}}>
              <div className={styles.fcontent}>
                <SVGS.FooterLogo />
                <p
                  style={{
                    marginTop: "10px",
                    // fontFamily: "Inter",
                    fontWeight: "300",
                    fontSize: "16px",
                    lineHeight: "36px",
                    color: "#EEEEEE",
                    paddingRight: "9rem",
                  }}
                >
                  {context.state.locale === "sa" ? homePageContent?.sa_footer_desc : homePageContent?.en_footer_desc}
                  </p>
                <div className={styles.logos} style={context.state.locale === "sa" ? {justifyContent: 'center'}: {}}>
                  <img style={{ color: "#ffffff" }} className="pointer" onClick={()=> handleSocialMedia("https://www.facebook.com/DRBKSA")} src={SVGS.fb} alt="fb-icon" />
                  <img
                    src={SVGS.twitter}
                    onClick={() =>
                      handleSocialMedia("https://twitter.com/drbdesignksa")
                    }
                    className="pointer"
                    alt="twitter"
                  />
                  <img
                    src={SVGS.logo_instagram}
                    onClick={() =>
                      handleSocialMedia(
                        "https://www.instagram.com/drb.designksa/"
                      )
                    }
                    className="pointer"
                    alt="instagram"
                  />
                  <img
                    src={SVGS.thread}
                    onClick={() =>
                      handleSocialMedia(
                        "https://www.threads.net/@drb.designksa"
                      )
                    }
                    className="pointer"
                    alt="thread"
                  />
                  <img
                    src={SVGS.tiktok}
                    onClick={() =>
                      handleSocialMedia("https://www.tiktok.com/@drb.designksa")
                    }
                    className="pointer"
                    alt="tiktok"
                  />
                  <img
                    src={SVGS.snapchat}
                    onClick={() =>
                      handleSocialMedia(
                        "https://www.snapchat.com/add/drb.designksa?share_id=I9o5EsHmXrQlocale=en-GB"
                      )
                    }
                    className="pointer"
                    alt="snapchat"
                  />
                   <img
                    src={SVGS.whatsapp}
                    onClick={() =>
                      handleSocialMedia(
                        "https://wa.me/966561674967"
                      )
                    }
                    className="pointer"
                    alt="snapchat"
                  />
                </div>
              </div>

              <div className={styles.menu}>
                <h6 className="ms-md-5 mb-0">
                  <FormattedMessage id="Partners" />
                </h6>
                <div style={{marginTop: -15}}>
                <img src={PartnerLogo} alt="logo" width={200} height={200} />
                </div>
              </div>

              <div className={styles.fsignup}>
                <h6>
                  <FormattedMessage id="Subscribe" />
                </h6>
                <div className={styles.inputWrap}>
                  <input
                    className={`${styles.inputst}`}
                    placeholder={
                      context.state.locale === "sa" ? "بريد إلكتروني" : "Email"
                    }
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <button
                    onClick={() => handleSubscription()}
                    className={`${styles.subscribebtnst}`}
                    disabled={!email.trim()}
                  >
                    <FormattedMessage id="Subscribe" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.copyRight} style={context.state.locale === "sa" ? {fontFamily: 'Noto Naskh Arabic'}: {}}>
        <FormattedMessage id="All rights reserved" />
      </div>
    </div>
  );
}
