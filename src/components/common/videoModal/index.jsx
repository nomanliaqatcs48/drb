import React, { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import cross from "../../../assets/cross.svg";
import video from "../../../assets/video.mp4";

const VideoModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className={styles.modal_wrap}
    >
      <Modal.Body>
        <div className={styles.cross} onClick={handleClose}>
          <img src={cross} alt="cross" />
        </div>
        <div className={styles.inner_wrap}>
          <video controls width="100%">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
