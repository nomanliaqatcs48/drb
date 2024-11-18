import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import { getHomePageContent } from "../redux/actions/content";

const Layout = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getHomePageContent());
  }, []);

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
