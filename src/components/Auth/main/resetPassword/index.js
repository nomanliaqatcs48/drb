import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ReactComponent as Logo } from "../../../../assets/drb-logo.svg";
import styles from "../styles.module.scss";

export default function ResetPassword() {
  const [passView, setPassView] = useState(false);
  const [cPassView, setCPassView] = useState(false);

  return (
    <div className="container">
      <div className="row content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="text-center">
            <Logo className="mb-40" />
            <h1>Reset Password</h1>
          </div>
          <Formik
            initialValues={{
              password: "",
              cpassword: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string().min(8).required("This field is required."),
              cpassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("This field is required."),
            })}
            onSubmit={(values) => {}}
          >
            {(props) => {
              const { values, touched, errors, handleChange, handleSubmit } =
                props;
              return (
                <form onSubmit={handleSubmit} className="w-100 mt-5">
                  <Form.Label className="content">Password</Form.Label>
                  <InputGroup className="mb-4">
                    <Form.Control
                      type={passView ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      size={"lg"}
                      onChange={handleChange}
                      value={values.password}
                      isInvalid={touched.password && errors.password}
                    />
                    <InputGroup.Text
                      onClick={() => setPassView(!passView)}
                      className="cursor-pointer"
                    >
                      <i
                        className={passView ? "bi bi-eye" : "bi bi-eye-slash"}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Form.Label className="content">Confirm Password</Form.Label>
                  <InputGroup className="mb-5">
                    <Form.Control
                      type={cPassView ? "text" : "password"}
                      name="password"
                      placeholder="Confirm Password"
                      size={"lg"}
                      onChange={handleChange}
                      value={values.cpassword}
                      isInvalid={touched.cpassword && errors.cpassword}
                    />
                    <InputGroup.Text
                      onClick={() => setCPassView(!cPassView)}
                      className="cursor-pointer"
                    >
                      <i
                        className={cPassView ? "bi bi-eye" : "bi bi-eye-slash"}
                      ></i>
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.cpassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                  <button className={styles.login} type="submit">
                    Change Password
                  </button>
                </form>
              );
            }}
          </Formik>
          {/* <h2 align="center" className="mb-1">
            Password Reset!
          </h2>
          <div
            style={{
              marginTop: 20,
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Your Password has been changed Successfully.
            <br />
            Please Sign In to your account with the new password.
          </div> */}
        </div>
      </div>
    </div>
  );
}
