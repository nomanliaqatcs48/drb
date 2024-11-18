import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CartSvg } from "../../../assets/cart";
import { CategorySvg } from "../../../assets/category";
export default function ProductCard({
  name,
  imageUrl,
  redirectUrl,
  unit_price,
  section
}) {
  const navigate = useNavigate();
  return (
    <Card className="pb-1 mb-4">
      <div
        style={{
          height: 300,
          backgroundImage: `url(${imageUrl})`,
          width: "100%",
          cursor: "pointer",
          padding: 16,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        onClick={() => navigate(redirectUrl)}
      ></div>
      <CardContent className="mt-1 px-3">

        {section === "product" && (<p className="mb-2 mt-1 title-wrap text-capitalize">{name}</p>) }
        <div className="d-flex mt-3">
        {section === "category" && (<p className="mb-2 mt-1 title-wrap text-capitalize">{name}</p>)}
        {section === "product" && (
          <div className="m-auto w-100">
            <b style={{ color: "#4f489e" }}>
              SR {parseFloat(unit_price).toFixed(2)}
            </b>
          </div>
          )}

          <div className="d-flex ml-auto">
            <div className="pointer" onClick={() => navigate(redirectUrl)}>
              {section === "product" ?  <CartSvg width={22} height={22} /> : <CategorySvg /> }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
