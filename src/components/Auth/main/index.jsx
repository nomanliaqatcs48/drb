import React, {useState, useEffect} from "react";
import styles from "./styles.module.scss";
import signin from "../../../assets/sign-in-img.png";
import { ReactComponent as Logo } from "../../../assets/drb-logo.svg";
import { ReactComponent as Shape } from "../../../assets/shape.svg";
import { ReactComponent as DesignShape } from "../../../assets/bottom-design.svg";
import SignIn from "./signIn";
import SignUp from "./signup";

const Main = () => {
  const [signInPage, setSignInPage] = useState(true)
  useEffect(() => {
   const path = window.location.pathname;
   if(path === '/sign-in'){
    setSignInPage(true)
   } else {
    setSignInPage(false);
   }
  }, []);
  return (
    <>
      <div className="container-fluid px-lg-60 px-0">
        <div className={styles.wrapper}>
          <div className="row py-50 mx-0">
            <div className="col-lg-6 col-xl-7 d-flex justify-content-center z-index-10">
              <div className={styles.img}>
                <img src={signin} className="img-fluid" alt="signin" />
              </div>
            </div>
            <div className="col-lg-6 col-xl-5 d-flex justify-content-center z-index-10">
              <div className={styles.signInWapper}>
                <Shape className={styles.signInShape} />
                <div className={styles.signIn}>
                  <div className={styles.content}>
                    <Logo className="mb-40" />
                    {signInPage ? <SignIn setSignInPage={() => setSignInPage(false)} /> :<SignUp setSignInPage={() => setSignInPage(true)} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-80 px-50 bg-secondary d-lg-block d-none" style={{position: "absolute", width: "100%", top: "58%"}} >
            <div className="container">
              <div className="row">
                <div className="col-md-7 d-flex justify-content-center">
                  <DesignShape />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
