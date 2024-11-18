import React, { useState } from "react";
import styles from "./styles.module.scss";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { handleRequest } from "../../../helpers/helpers";

const SignUp = ({setSignInPage}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const register = async (data) => {
    try {
      setLoading(true);
      const res = await handleRequest("post", "/auth/user/register", data);
      if (res.data.success) {
        toast.success("User Registered Successfully!");
        setLoading(false);
        setSignInPage();
        navigate("/sign-in")
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }    
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        gender: "male",
        password: "",
        cpassword: "",
      }}
      validationSchema={Yup.object({
        fullName: Yup.string()
          .required("This field is required."),
        email: Yup.string()
          .email("Invalid email address")
          .required("This field is required."),
        password: Yup.string()
          .min(8)
          .required("This field is required."),
        // cpassword: Yup.string()
        //   .oneOf(
        //     [Yup.ref("password"), null],
        //     "Passwords must match"
        //   )
        //   .required("This field is required."),
      })}
      // enableReinitialize
      onSubmit={(values) => {
        const {fullName, email, password} = values;
        const data = {
          userName: fullName,
          email,
          password

        }
        register(data);
        // handleReset()
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          // handleReset,
        } = props;
        return (
          <form onSubmit={handleSubmit} className="w-100">
            <Form.Group className="mb-25">
              <Form.Control
                type="text"
                placeholder="Name"
                name="fullName"
                onChange={handleChange}
                value={values.fullName}
                isInvalid={
                  touched.fullName &&
                  errors.fullName
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-25">
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
                isInvalid={
                  touched.email &&
                  errors.email
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-25">
                        {/* <Form.Label>
                          Gender
                        </Form.Label> */}

                        <Form.Select
                          // size="lg"
                          onChange={handleChange}
                          value={values.gender}
                          name="gender"
                          placeholder="Gender"
                        >
                          <option value={"male"}>Male</option>
                          <option value={"female"}>Female</option>
                          <option value={"other"}>Other</option>
                        </Form.Select>
                      </Form.Group>
            <Form.Group className="mb-25">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={values.password}
                isInvalid={
                  touched.password &&
                  errors.password
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group className="mb-25">
              <Form.Control
                type="text"
                placeholder="Confirm Password"
                name="cpassword"
                onChange={handleChange}
                value={values.cpassword}
                isInvalid={
                  touched.cpassword &&
                  errors.cpassword
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.cpassword}
              </Form.Control.Feedback>
            </Form.Group> */}
            <button
              type="submit"
              className={styles.login}
              disabled={loading}
            >
             Register
            </button>
            <div className={styles.registerText} style={{textAlign: 'center'}}>
        <span>Already have an account?</span>
        <button className={styles.textBtn} onClick={() => {navigate("/sign-in"); setSignInPage()}}>Login</button>
      </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default SignUp;
