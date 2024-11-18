import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import cross from "../../../assets/cross.svg";
import { characters } from "../../../assets/galleriesCharacters";
import { FormattedMessage } from "react-intl";
import { IntlContext } from "../../../context/Internationalization";
import animation from "./images";

const AvatarListModal = ({
  show,
  setShow,
  onSave,
  loading,
  setLoading,
  username,
}) => {
  const [name, setName] = useState("");
  const [char, setChar] = useState("");
  const [gif, setGif] = useState("");
  const [isError, setIsError] = useState(false);
  const context = useContext(IntlContext);
  const handleClose = () => {
    setLoading(false);
    setShow(false);
    setIsError(false)
    setChar("");
    setName("")
  };

  useEffect(() => {
    setName(username);
  }, [username]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className={styles.modal_wrap}
    >
      <Modal.Body dir={context.state.locale === "sa" ? "rtl" : "ltr"}>
        <h4 className="mt-4 text-center">
          <FormattedMessage id="CHOOSE YOUR AVATAR" />
        </h4>
        <div className={styles.cross} onClick={handleClose}>
          <img src={cross} alt="cross" />
        </div>

        <div className={styles.inner_wrap}>
          <Form.Control
            type="text"
            name="name"
            placeholder={
              context.state.locale === "en"
                ? "Your name here..."
                : "اسمك هنا..."
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!name && isError ? true : false}
            style={{ border: !name && isError ? "1px solid #dc3545" : "" }}
          />
          {!name && isError && (
            <Form.Control.Feedback
              type="invalid"
              style={{ textAlign: "start" }}
            >
              Please enter the name
            </Form.Control.Feedback>
          )}
          <div className={styles.avatarListing}>
            {characters.map((avatar, i) => (
              <div
                className={styles.avatarBtn}
                onClick={() => {
                  setChar(avatar.name);
                }}
                key={avatar.id}
              >
                <img
                  src={avatar.gif}
                  alt={'...loading'}
                  className={styles.selected}
                  style={char === avatar.name ? { backgroundColor: "#8d8372", display: 'block' } : {display: 'none'}}
                />
                <img
                  // src={char === `char${i+1}` && avatar.name === `char${i+1}` ? avatar.gif : avatar.image}
                  src={avatar.image}
                  // src={avatar.gif}
                  alt={avatar.name}
                  className={"w-100"}
                  // style={{ backgroundColor: char === avatar.name === `char${i+1}` && "#8d8372"}}
                  style={char === avatar.name ? { display: 'none' } : {display: 'block'}}
                  // style={{ backgroundColor: avatar.name === char && "#8d8372"}}
                />
              </div>
            ))}
           
          </div>
          {!char && isError && <div style={{ textAlign: "start", marginLeft: 8, color: '#dc3545', fontSize: '.875em' }}>Please select a character</div>}
          <div className={styles.btn_wrap}>
            <button
              className={styles.continue}
              disabled={loading}
              onClick={() => {
                if (!char || !name) {
                  // return toast.error("Please select a character");
                  setIsError(true);
                  return;
                }
                setIsError(false)
                onSave(name, char);
                // setName("");
              }}
            >
              <FormattedMessage id="Continue" />
            </button>
            {/* <button
              className={styles.cancel}
              onClick={() => {
                setShow(false);
                setName("");
              }}
            >
              Cancel
            </button> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AvatarListModal;
