import { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import DummyUser from "../../../assets/profileImage.png";
import ProfileFemaleIcon from "../../../assets/profileFemaleIcon.png";
import Navbar from "react-bootstrap/Navbar";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { useLocation, NavLink } from "react-router-dom";
import { ENV } from "../../../config/config";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SocketContext from "../../../context/socketContext";
import SVGS from "../../../assets/svg";
import { CartSvg } from "../../../assets/cart";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useListenMetaMaskAccs } from "../../../hooks/useListenMetamask";
import Drawer from "./cartDarwer";
import { getCartItems } from "../../../redux/actions/product";
import { getUser } from "../../../redux/actions/user";
import {
  setOrderCompletion,
  setOrderCancellation,
} from "../../../redux/actions/order";
import Popover from "@mui/material/Popover";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageDropdown from "../../../components/common/languageDropdown";
import { IntlContext } from "../../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import { isMobile } from "react-device-detect";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean | null>(false);
  const [items, setItems] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);
  const socket = useContext(SocketContext);
  const context = useContext(IntlContext);
  const currentPath = location.pathname;
  const contactUsPath = currentPath === "/contact-us";

  const { cartItems } = useSelector((state: any) => state.product);
  const { userInfo } = useSelector((state: any) => state.user);

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(
        (ENV?.getUserKeys("accessToken") as { accessToken: string }).accessToken
          ? true
          : false
      );
    };
    window.addEventListener("storage", handleStorage);
    handleStorage();
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
    dispatch<any>(getUser());
  }, []);
  useEffect(() => {
    if (socket) {
      socket?.on("webhook", (response: any) => {
        if (
          response.userId == (ENV.getUserKeys("_id") as { _id: string })?._id
        ) {
          if (response.status === "CAPTURED") {
            dispatch<any>(setOrderCompletion(true));
            navigate("/orders");
            setTimeout(() => {
              dispatch<any>(getCartItems());
            }, 1000);
          } else {
            navigate("/checkout");
            dispatch<any>(setOrderCancellation(true));
          }
        }
      });
      socket?.on("blockUser", (info: { id: string }) => {
        if ((ENV.getUserKeys("_id") as { _id: string })?._id === info?.id) {
          toast.error("Admin has blocked you");
          localStorage.removeItem("encus");
          localStorage.removeItem("token");
          // navigate("/sign-in");
        }
      });
      socket.on("mintingStatus", (info: any) => {
        console.log(info, "event received==>");
      });

      return () => {};
    }
  }, [socket]);

  useEffect(() => {
    cartItems?.items ? setItems(cartItems.items.length) : setItems(0);
  }, [cartItems]);
  useListenMetaMaskAccs();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <Navbar
        expand="lg"
        expanded={expanded}
        className={`${styles.navbar_style} ${contactUsPath && styles.contact}`}
      >
        <Container
          className={`${styles.header}`}
          dir={context.state.locale === "sa" ? "rtl" : "ltr"}
        >
          <Row>
            <Col xs={12} lg={2} className={styles.mblwrap}>
              <Navbar.Brand>
                <NavLink to="/">
                  {/* {contactUsPath ? <SVGS.WhiteLogo /> : <SVGS.HeaderLogo />} */}
                  <SVGS.WhiteLogo />
                </NavLink>
              </Navbar.Brand>
              <div className="d-flex">
                <div
                  className={styles.cartMbl}
                  style={
                    context.state.locale === "sa"
                      ? { marginLeft: "2rem" }
                      : { marginRight: "1.5rem" }
                  }
                >
                  <div onClick={() => setIsOpenDrawer(true)}>
                    <CartSvg
                      width={26}
                      height={26}
                      color={"#fff"}
                      style={{ marginLeft: "-18px" }}
                    />
                  </div>
                  <div className="text-center">
                    <span className="cart light">{items || 0}</span>
                  </div>
                </div>
                <Navbar.Toggle
                  aria-controls="navbarScroll"
                  onClick={() =>
                    setExpanded(
                      (prevExpanded) => (prevExpanded = !prevExpanded)
                    )
                  }
                />
              </div>
            </Col>
            <Col xs={12} lg={8} className="d-flex">
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0 justify-content-center w-100"
                  style={{ color: "white" }}
                  navbarScroll
                >
                  <Nav.Link>
                    <NavLink
                      style={
                        context.state.locale === "en"
                          ? { letterSpacing: "0.1em" }
                          : {}
                      }
                      to="/"
                      onClick={() => setExpanded(false)}
                    >
                      <FormattedMessage id="HOME" />
                    </NavLink>
                  </Nav.Link>
                  {isLoggedIn && (
                    <Nav.Link className={styles.mblWrap}>
                      <NavLink
                        style={
                          context.state.locale === "en"
                            ? { letterSpacing: "0.1em" }
                            : {}
                        }
                        to="/account"
                        onClick={() => setExpanded(false)}
                      >
                        <FormattedMessage id="ACCOUNT" />
                      </NavLink>
                    </Nav.Link>
                  )}
                  <Nav.Link>
                    <NavLink
                      style={
                        context.state.locale === "en"
                          ? { letterSpacing: "0.1em" }
                          : {}
                      }
                      to="/explore"
                      onClick={() => setExpanded(false)}
                    >
                      <FormattedMessage id="EXPLORE" />
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink
                      style={
                        context.state.locale === "en"
                          ? { letterSpacing: "0.1em" }
                          : {}
                      }
                      to="/souvenirs"
                      onClick={() => setExpanded(false)}
                    >
                      <FormattedMessage id="SOUVENIRS" />
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink
                      style={
                        context.state.locale === "en"
                          ? { letterSpacing: "0.1em" }
                          : {}
                      }
                      to="/gift"
                      onClick={() => setExpanded(false)}
                    >
                      <FormattedMessage id="GIFT" />
                    </NavLink>
                  </Nav.Link>
                  {!isMobile && isLoggedIn && (
                    <Nav.Link>
                      <NavLink
                        style={
                          context.state.locale === "en"
                            ? { letterSpacing: "0.1em" }
                            : {}
                        }
                        to="/nft-mint"
                        onClick={() => setExpanded(false)}
                      >
                        <FormattedMessage id="MINT" />
                      </NavLink>
                    </Nav.Link>
                  )}
                  {isLoggedIn && (
                    <Nav.Link className={styles.mblWrap}>
                      <NavLink
                        style={
                          context.state.locale === "en"
                            ? { letterSpacing: "0.1em" }
                            : {}
                        }
                        to="/orders"
                        onClick={() => setExpanded(false)}
                      >
                        <FormattedMessage id="ORDERS HISTORY" />
                      </NavLink>
                    </Nav.Link>
                  )}
                  <Nav.Link>
                    <NavLink
                      style={
                        context.state.locale === "en"
                          ? { letterSpacing: "0.1em" }
                          : {}
                      }
                      to="/contact-us"
                      onClick={() => setExpanded(false)}
                    >
                      <FormattedMessage id="CONTACT US" />
                    </NavLink>
                  </Nav.Link>
                  {isLoggedIn !== null && !isLoggedIn && (
                    <Nav.Link>
                      <NavLink
                        style={
                          context.state.locale === "en"
                            ? { letterSpacing: "0.1em" }
                            : {}
                        }
                        to="/sign-in"
                      >
                        <FormattedMessage id="SIGN IN" />
                      </NavLink>
                    </Nav.Link>
                  )}
                  {isLoggedIn && (
                    <Nav.Link
                      className={styles.logoutMbl}
                      onClick={() => {
                        {
                          toast.success("User logged out successfully");
                          setIsLoggedIn(false);
                          localStorage.removeItem("encuse");
                          localStorage.removeItem("token");
                          navigate("/sign-in");
                        }
                      }}
                    >
                      <a>
                        <FormattedMessage id="Logout" />
                      </a>
                      <TbLogout className={styles.logoutIcon} />
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Col>
            {isLoggedIn ? (
              <>
                <Col
                  lg={1}
                  className="d-flex text-center align-items-start justify-content-end"
                  style={{ paddingRight: "1.5rem" }}
                >
                  <div className={styles.langWrap}>
                    <LanguageDropdown lightColor={true} />
                  </div>
                  {/* </Col>
                <Col lg={1}> */}
                  <div className={styles.cartWrap}>
                    <div onClick={() => setIsOpenDrawer(true)}>
                      <CartSvg width={26} height={26} color={"#fff"} />
                    </div>
                    <div
                      className={
                        context.state.locale === "sa" ? "text-center" : ""
                      }
                    >
                      <span className="cart light">{items || 0}</span>
                    </div>
                  </div>
                </Col>
                <Col lg={1} className="d-xs-none">
                  <div
                    aria-describedby={"menu"}
                    className={styles.logoutWrap}
                    onClick={handleClick}
                  >
                    <img
                      src={
                        userInfo?.profileImg
                          ? userInfo?.profileImg
                          : userInfo?.gender === "female"
                          ? ProfileFemaleIcon
                          : DummyUser
                      }
                      alt="profile"
                      height={35}
                      width={35}
                      style={{ marginTop: -5, borderRadius: "50%" }}
                    />
                  </div>
                  <Popover
                    id={"menu"}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div style={{ border: "1px solid #0000s", padding: 6 }}>
                      <div>
                        <Button
                          startIcon={<AccountCircleIcon />}
                          onClick={() => {
                            navigate("/account");
                            handleClose();
                          }}
                        >
                          <FormattedMessage id="Account" />
                        </Button>
                      </div>
                      <div>
                        <Button
                          startIcon={<ManageSearchIcon />}
                          onClick={() => {
                            navigate("/orders");
                            handleClose();
                          }}
                        >
                          <FormattedMessage id="Order History" />
                        </Button>
                      </div>
                      <Button
                        startIcon={<LogoutIcon />}
                        onClick={() => {
                          {
                            toast.success("User logged out successfully");
                            setIsLoggedIn(false);
                            localStorage.removeItem("encuse");
                            localStorage.removeItem("token");
                            navigate("/sign-in");
                          }
                        }}
                      >
                        <FormattedMessage id="Logout" />
                      </Button>
                    </div>
                  </Popover>
                </Col>
              </>
            ) : (
              <Col
                lg={1}
                className="d-flex text-center align-items-start justify-content-end"
                style={{ paddingRight: "1.5rem" }}
              >
                <div className={styles.langWrap}>
                  <LanguageDropdown lightColor={true} />
                </div>
              </Col>
            )}
          </Row>
        </Container>
        <Drawer
          isOpenDrawer={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          cartItems={cartItems}
        />{" "}
        :
      </Navbar>
      <div
        className={styles.langWrapMbl}
        style={{ marginTop: contactUsPath ? "1rem" : "5rem" }}
      >
        <LanguageDropdown lightColor={false} />
      </div>
    </>
  );
}

export default Header;
