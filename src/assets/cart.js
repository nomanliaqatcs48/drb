import React from "react";

export const CartSvg = (props) => {
  const {width, height, color} = props
  return (  <svg xmlns="http://www.w3.org/2000/svg" {...props} width={width ?? "25"} height={height ?? "25"} className="cursor-pointer" viewBox="0 0 1792 1792" id="Cart">
    <path
      d="M1280 704q0-26-19-45t-45-19h-128V512q0-26-19-45t-45-19-45 19-19 45v128H832q-26 0-45 19t-19 45 19 45 45 19h128v128q0 26 19 45t45 19 45-19 19-45V768h128q26 0 45-19t19-45zm-576 832q0 53-37.5 90.5T576 1664t-90.5-37.5T448 1536t37.5-90.5T576 1408t90.5 37.5T704 1536zm896 0q0 53-37.5 90.5T1472 1664t-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm128-1088v512q0 24-16 42.5t-41 21.5L627 1146q1 7 4.5 21.5t6 26.5 2.5 22q0 16-24 64h920q26 0 45 19t19 45-19 45-45 19H512q-26 0-45-19t-19-45q0-14 11-39.5t29.5-59.5 20.5-38L332 384H128q-26 0-45-19t-19-45 19-45 45-19h256q16 0 28.5 6.5t20 15.5 13 24.5T453 329t5.5 29.5T463 384h1201q26 0 45 19t19 45z"
      fill={color ?? "#4f489e"}
      className="color000000 svgShape"
    ></path>
  </svg>
  )

};