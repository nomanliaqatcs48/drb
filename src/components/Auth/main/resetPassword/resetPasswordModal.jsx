import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../styles.module.scss";
import { handleRequest } from "../../../../helpers/helpers";

export default function ResetPasswordModal({ show, handleClose }) {

  const forgotPassword = async (email) => {
    try {
      // setLoading(true);
      const res = await handleRequest("post", "/user/forgot-password", {email});
    } catch (err) {
      // setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      dialogClassName="address-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-4">
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("This field is required."),
          })}
          onSubmit={(values) => {
            forgotPassword(values.email)
          }}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleSubmit } =
              props;
            return (
              <form onSubmit={handleSubmit} className="w-100">
                <Form.Label className="content">
                  Enter your email and a reset link will be sent to your email
                </Form.Label>
                <InputGroup className="mb-4">
                  <Form.Control
                    type={"email"}
                    name="email"
                    placeholder="Email*"
                    size={"lg"}
                    onChange={handleChange}
                    value={values.email}
                    isInvalid={touched.email && errors.email}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
                <button className={styles.login} type="submit">
                  Submit
                </button>
              </form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
