import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGiftProductCategoriesImages,
  getProductCategories,
  getProducts,
  getGiftBoxes,
  getLogo
} from "../../redux/actions/product";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NewProduct from "./newProduct";

export default function List() {
  const dispatch = useDispatch();

  const [categoriesList, setCategoriesList] = useState([]);

  const { categories, productGiftCategories, products, productGiftCategoriesLoading, logoList } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    // getProductsData();
    dispatch(getGiftProductCategoriesImages())
    dispatch(getProductCategories());
    dispatch(getProducts({ categoryId: 223,  page: 1, limit: 20,}))
    dispatch(getGiftBoxes());
    dispatch(getLogo());
  }, []);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  },[])

  useEffect(() => {
    setCategoriesList(categories);
  }, [categories]);

  return (
    <Container
      style={{ minHeight: "50vh" }}
      className="justify-content-md-center main-wrapper"
    >
      <Row>
        <NewProduct productCategories={productGiftCategories} products={products} productGiftCategoriesLoading={productGiftCategoriesLoading} logoList={logoList} />
      </Row>
    </Container>
  );
}
