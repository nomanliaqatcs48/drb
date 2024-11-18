import React from "react";

const Layout = (props: any) => {
  return (
    <>
      <div className="main">{props.children}</div>
    </>
  );
};

export default Layout;
