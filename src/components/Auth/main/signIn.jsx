import React, { useState } from "react";
import styles from "./styles.module.scss";
import Form from "react-bootstrap/Form";
import metamask from "../../../assets/metamask.svg";
import { handleRequest } from "../../../helpers/helpers";
import {
  handleSign,
  isMetaMaskInstalled,
  redirectToMetaMaskExtension,
  validateMetamask,
} from "../../../helpers/web3";
import { ENV } from "../../../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import ResetPasswordModal from "./resetPassword/resetPasswordModal";

const SignIn = ({ setSignInPage }) => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isOpenResetPassModal, setIsOpenResetPassModal] = useState(false);
  const [redirectURL, setRedirectURL] = useState(
    localStorage.getItem("redirectURL")
  );
  const navigate = useNavigate();
  const handleMetamask = () => {
    if (isMetaMaskInstalled()) {
      return validateUser();
    }
    redirectToMetaMaskExtension();
  };
  const validateUser = async () => {
    try {
      // const currentChainId = await getChainId();
      // if (ENV.chainId !== currentChainId) {
      //   await switchNetworkToChainId(ENV.chainId);
      // }
      // const connectedAddress = await connectWithMetamask();
      // if (!connectedAddress) {
      //   return alert("address not foound");
      // }
      const connectedAddress = await validateMetamask(setLoading);
      const res = await handleRequest(
        "post",
        `/user/auth/metamask/signUser/${connectedAddress}`
      );
      const { users } = res.data;
      if (users.length > 0) {
        const { address, signature } = await handleSign(users[0].nounce);
        loginUser(address, signature);
      } else {
        signUpUser(connectedAddress);
      }
    } catch (err) {
      setLoading(false);
      console.log(err, "error=>");
    }
  };

  const signUpUser = async (connectedAddress) => {
    try {
      const res = await handleRequest(
        "post",
        `/user/auth/metamask/register/${connectedAddress}`
      );
      if (res.data.success) {
        const { address, signature } = await handleSign(res.data.data.nounce);
        loginUser(address, signature);
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const loginUser = async (address, signature) => {
    try {
      const res = await handleRequest(
        "post",
        `/user/auth/metamask/login/${address}`,
        {
          address,
          signature,
          role: "user",
        }
      );
      if (res.data.success) {
        ENV.encryptUserData({
          accessToken: res.data.data.accessToken,
          ...res.data.data._doc,
        });
        localStorage.setItem("token", res.data.data.accessToken);
        toast.success("User logged in successfully");
        navigate(redirectURL ? redirectURL : "/");
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  const loginWithGoogle = async (data) => {
    try {
      setLoading(true);
      const res = await handleRequest("post", "/user/auth/google/login", data);
      console.log(res, "res");
      const { email, token, userInfo } = res.data.user;
      ENV.encryptUserData({
        accessToken: token,
        email,
        ...userInfo,
      });
      localStorage.setItem("token", token);
      if (res.data.success) {
        toast.success("User logged in successfully");
        setLoading(false);
        navigate(redirectURL ? redirectURL : "/");
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const loginWithEmailPass = async (data) => {
    try {
      setLoading(true);

      const res = await handleRequest("post", "/auth/user/login", data);
      const { token, user } = res.data.data;
      ENV.encryptUserData({
        accessToken: token,
        email: user.email,
        ...user,
      });
      localStorage.setItem("token", token);
      if (res.data.success) {
        toast.success("User logged in successfully");
        setLoading(false);
        navigate(redirectURL ? redirectURL : "/");
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Email"
        className="mb-15"
        name="email"
        onChange={(e) =>
          setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
          })
        }
      />
      <Form.Control
        type="password"
        placeholder="Password"
        name="password"
        className="mb-30"
        onChange={(e) =>
          setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
          })
        }
      />
      <button
        className={styles.login}
        disabled={loading}
        onClick={() => {
          // login();
          loginWithEmailPass({
            email: credentials.email,
            password: credentials.password,
          });
          // toast.success("User logged in successfully");
          // navigate("/");
        }}
      >
        Log in
      </button>
      <div className="mt-1">
        <button
          className={styles.textBtn}
          onClick={() => {
            setIsOpenResetPassModal(true)
          }}
        >
          Forgot Password?
        </button>
      </div>
      <div className={styles.registerText}>
        <span>Don't have a account?</span>
        <button
          className={styles.textBtn}
          onClick={() => {
            navigate("/sign-up");
            setSignInPage();
          }}
        >
          Sign Up
        </button>
      </div>

      <button
        className={`${styles.login} mt-3`}
        disabled={loading}
        onClick={() => navigate("/")}
      >
        Guest User
      </button>
      <div className={styles.text}>OR</div>

      {/* {isMobile && ( */}
      <button
        className={styles.meta}
        onClick={() => handleMetamask()}
        disabled={loading}
      >
        Login with Metamask
        <img src={metamask} alt="meta" />
      </button>

      {/* <div className={styles.text}>OR</div> */}
      {/* {!isMobile && ( */}
      <div className="mt-2">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            loginWithGoogle({
              credential: credentialResponse.credential,
            });
          }}
          onError={() => {
            console.log("Login Failed==>");
          }}
        />
      </div>
      <ResetPasswordModal show={isOpenResetPassModal} handleClose={() => setIsOpenResetPassModal(false)} />
    </>
  );
};

export default SignIn;
