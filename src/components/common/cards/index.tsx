import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { ENV } from "../../../config/config";
import AvatarListModal from "../avatarListModal/index";
import { socialShare } from "../../../utils/data";
import SVGS from "../../../assets/svg";
import { capatilize } from "../../../helpers/helpers";
import { isUserAlreadyAdded } from "../../../helpers/helpers";
import {
  validateMetamask,
  isMetaMaskInstalled,
  redirectToMetaMaskExtension,
} from "../../../helpers/web3";
import { useSelector } from "react-redux";

const Cards = ({ data, refetch, socket }: any) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [loading, setLoading] = useState(false);
  const { views, name, _id, liveUserId, fileName, key } = data;

  const { userInfo } = useSelector((state: any) => state.user);

  const handleMouseLeave = () => {
    setShowShare(false);
  };
  const handleLiveUsers = async (
    galleryId: string,
    userName: string,
    char: string
  ) => {
    // if (isMetaMaskInstalled()) {
    //   const address = await validateMetamask(setLoading);
    //   if (address) {
        addLiveUserAndUpdateViews(galleryId, userName, char);
    //   }
    //   return;
    // }
    // toast.info("Please install metamask to continue");
    // redirectToMetaMaskExtension();
  };


  const addLiveUserAndUpdateViews = async (
    galleryId: string,
    userName: string,
    char: string
  ) => {
    try {
      // setShow(false);
      const userId: string = (ENV.getUserKeys("_id") as { _id: string })._id;
      if (!userId) {
        navigate("/sign-in");
        return;
        // return toast.info("Please signin first");
      }
      if (!userName?.trim()) {
        // return toast.info("Please add user name");
      }
      // if (isUserAlreadyAdded(data?.liveUserId?.users)) {
      //   return toast.info("You are already in the environment");
      // }
      window.open(
        `/Environments/index.html?name=${userName}&body=${char}&environment=${key}&address=${userId}&galleryId=${galleryId}`,
        "_self"
      );
    } catch (err: any) {
      console.log(err, "errpr");
    }
  };

  useEffect(() => {
    if (socket) {
      socket?.emit("join", "explore/galleries");
      socket?.on("liveUsers/views", () => {
        console.log("event is received==>");
        refetch();
      });
      return () => {
        socket.emit("leave", "explore/galleries");
      };
    }
  }, [socket]);

  return (
    <>
      <AvatarListModal
        show={show}
        loading={loading}
        setLoading={setLoading}
        setShow={setShow}
        onSave={(name: string, char: string) => {
          handleLiveUsers(_id, name, char);
        }}
        username={userInfo?.userName || ''}
      />
      <div className="p-event-10">
        <div className={styles.card} key={_id} onMouseLeave={handleMouseLeave}>
          <div className={styles.img_wrap}>
            <img
              src={`${ENV.fileBaseUrl}/${fileName}`}
              alt="card"
              onClick={(e) => {
                e.stopPropagation();
                handleMouseLeave();
                setShow(true);
              }}
              height={190}
            />
            {liveUserId?.users?.length > 0 && (
              <div className={styles.badge}>
                {liveUserId.users.length} <img src={SVGS.badge} alt="badge" />
              </div>
            )}
          </div>
          <div className={styles.content_wrap}>
            <div
              className={styles.title}
              onClick={(e) => {
                e.stopPropagation();
                handleMouseLeave();
                setShow(true);
              }}
            >
              {capatilize(name)}
            </div>
            <div className={styles.views_likes}>
              <div className={styles.views}>
                {views} <SVGS.Eye />
              </div>
              <div className={styles.likes}>
                <SVGS.ShareIcon onClick={() => setShowShare(!showShare)} />
                {showShare && (
                  <div className={styles.shareBox}>
                    {socialShare.map((platform) => {
                      return (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {" "}
                          {platform.content}{" "}
                        </span>
                      );
                    })}
                  </div>
                )}
                {/* {(likes && likes?.length) || 0}
              {liked ? (
                <LikeFilled
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeDislike("dislike", _id);
                  }}
                />
              ) : (
                <Like
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeDislike("like", _id);
                  }}
                />
              )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
