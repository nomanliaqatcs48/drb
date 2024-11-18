import React from "react";

const Section = ({url, title}) => {
    return (
        <div className="col-6 col-md-2 col-lg-2 mt-5 mb-2">
          <img
            src={url}
            className="serve-section-img"
          />
          <h4>{title}</h4>
        </div>
    )
}
export default function Serve() {
  return (
    <div className="justify-content-center text-center mt-5 mb-4 row">
      <div className="col-12 mb-3">
        <h1>Who do we serve?</h1>
      </div>
        <Section url="https://corporate.raseel.gift/hubfs/theme-icons/new-icons/Human%20Resources.svg" title="Lorem Ipsum" />
        <Section url="https://corporate.raseel.gift/hubfs/theme-icons/new-icons/Marketing.svg" title="Lorem Ipsum" />
        <Section url="https://corporate.raseel.gift/hubfs/theme-icons/new-icons/Business%20Owners.svg" title="Lorem Ipsum" />
        <Section url="https://corporate.raseel.gift/hubfs/theme-icons/new-icons/Event%20agent.svg" title="Lorem Ipsum" />
        <Section url="https://corporate.raseel.gift/hubfs/theme-icons/new-icons/Internal%20Communication.svg" title="Lorem Ipsum" />
        {/* <Section url="https://corporate.raseel.gift/hubfs/theme-icons/new-icons/Marketing.svg" title="Marketing and PR" /> */}
     
    </div>
  );
}
