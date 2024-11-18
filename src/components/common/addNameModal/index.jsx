import React, { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import cross from "../../../assets/cross.svg";

const AddNameModal = ({ show, setShow, onSave }) => {
  const [name, setName] = useState("");
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
          <div className={styles.heading}>Add Name</div>
          <input
            type="text"
            placeholder="Username"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.btn_wrap}>
            <button
              className={styles.continue}
              onClick={() => {
                onSave(name);
                setName("");
              }}
            >
              Continue
            </button>
            <button
              className={styles.cancel}
              onClick={() => {
                setShow(false);
                setName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddNameModal;
