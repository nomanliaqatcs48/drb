import React, { useContext } from "react";
import styles from "./styles.module.scss";
import Videos from "../../../assets/videos";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import Banner from "../../common/banner";

const Video = ({homePageContent, productCategories}:{homePageContent: any, productCategories: any}) => {
  const context = useContext(IntlContext);
  return (
    <div className={styles.wrapper}>
      <div className={styles.video_wrap}>
        {/* <video width="100%" autoPlay loop muted>
          <source src={Videos.videoMain} type="video/webm" />
          <FormattedMessage id="Your browser does not support the video tag" />.
        </video> */}
        <Banner
            bannerProducts={
              productCategories.length > 0
                ? productCategories.filter((item: any) => item.isBanner)
                : []
            }
          />


      </div>
      {/* <div className={`container ${styles.content_wrap}`} style={context.state.locale === "sa" ? {fontFamily: 'Noto Naskh Arabic'}: {}}>
        {homePageContent?.sa_hero_title && (
          <div className={styles.heading}>
            {context.state.locale === "sa"
              ? homePageContent?.sa_hero_title
              : homePageContent?.en_hero_title}
          </div>
        )}
        {homePageContent?.sa_hero_title && (
          <div className={styles.text}>
            {context.state.locale === "sa"
              ? homePageContent?.sa_hero_desc
              : homePageContent?.en_hero_desc}
          </div>
        )}
        {homePageContent?.en_hero_btn && (
          <button>
            {context.state.locale === "sa"
              ? homePageContent?.sa_hero_btn
              : homePageContent?.en_hero_btn}
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Video;
