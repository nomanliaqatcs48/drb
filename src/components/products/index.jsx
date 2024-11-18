import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCategoriesImages,
  getProductCategories,
  getProductBrands
} from "../../redux/actions/product";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NewProduct from "./newProduct";

export default function List() {
  const dispatch = useDispatch();

  const { productCategories, productCategoriesLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductCategoriesImages())
    dispatch(getProductCategories());
    localStorage.removeItem("redirectURL");
  }, []);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  },[])

  return (
    <Container
      style={{ minHeight: "50vh" }}
      className="justify-content-md-center main-wrapper"
    >
      <Row>
        <NewProduct productCategories={productCategories} productCategoriesLoading={productCategoriesLoading} />
      </Row>
    </Container>
  );
}
