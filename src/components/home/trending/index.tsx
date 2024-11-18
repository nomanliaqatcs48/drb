import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { handleRequest } from "../../../helpers/helpers";
import SocketContext from "../../../context/socketContext";
import { ENV } from "../../../config/config";
import Card from "../../common/cards";
import styles from "./styles.module.scss";
import SVGS from "../../../assets/svg";
import { IntlContext } from "../../../context/Internationalization";
import { getCartItems } from "../../../redux/actions/product";
import { FormattedMessage } from "react-intl";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";

function Trending({homePageContent}:{homePageContent: any}) {
  const dispatch = useDispatch()
  const [galleries, setGalleries] = useState(null);
  const [page, setPage] = useState(1);
  const socket = useContext(SocketContext);
  const context = useContext(IntlContext);
  useEffect(() => {
    getAllGalleries();
    dispatch<any>(getCartItems());
  }, []);
  const getAllGalleries = async () => {
    try {
      const userId: string = (ENV.getUserKeys("_id") as { _id: string })?._id;
      const result = await handleRequest(
        "post",
        "/galleries",
        { userId },
        { page, isActive: true }
      );
      setGalleries(result.data);
    } catch (err) {
      console.log(err, "error=>");
    }
  };
  useEffect(() => {
    if (socket) {
      socket?.emit("join", "explore/galleries");
      socket?.on("explore/galleries", (newAuctionCreatedInformation: any) => {
        getAllGalleries();
      });
      return () => {
        socket.emit("leave", "explore/galleries");
      };
    }
  }, [socket]);

  const { data }: any = galleries || {};

  return (
    <div className={styles.wrapper}>
          <div
            className="container"
            dir={context.state.locale === "sa" ? "rtl" : "ltr"}
          >
            <div className="d-flex align-items-center mb-30">
              <h3 className={styles.heading} style={context.state.locale === "sa" ? {marginLeft: "1.5rem"} : {}}>{context.state.locale === "sa" ? homePageContent?.sa_gallery_title : homePageContent?.en_gallery_title }</h3>
              {!isMobile && <SVGS.TextArt className="ms-30" />}
            </div>
            <Row>
              {galleries &&
                data?.length > 0 &&
                data?.map((item: any, i: number) => {
                  return (
                    <Col md={6} lg={4} key={i}>
                      <Card
                        data={item}
                        refetch={() => getAllGalleries()}
                        socket={socket}
                      />
                    </Col>
                  );
                })}
            </Row>
          </div>
          
       
    </div>
  );
}

export default Trending;
