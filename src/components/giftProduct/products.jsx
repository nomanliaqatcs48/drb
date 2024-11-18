import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CartSvg } from "../../assets/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  addCartItem,
  createCart,
  getProductCategories,
} from "../../redux/actions/product";
import { ENV } from "../../config/config";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductDetailModal from "./productDetailModal";
import { IntlContext } from "../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import { isMobile } from "react-device-detect";
import TablePagination from "@mui/material/TablePagination";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(IntlContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedTab, setSelectedTab] = useState();
  const [sortingFilter, setSortingFilter] = useState("default");
  const [isProduct, setIsProduct] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const {
    products,
    cartItems,
    isProductLoading,
    categories,
    selectedProductTab,
    pagination,
  } = useSelector((state) => state.product);

  const getProductsData = () => {
    let categoryId = window.location.pathname.split("/");
    if (categoryId.length > 3) {
      categoryId = categoryId[3];
    }

    if (!categoryId && selectedCategory != "all") {
      categoryId = selectedCategory;
    }

    if (selectedProductTab === "all-product") {
      dispatch(
        getProducts({
          categoryId,
          priceOrder: sortingFilter !== "default" ? sortingFilter : "",
          page: page + 1,
          limit: rowsPerPage,
        })
      );
    } else {
      dispatch(getProducts({ printable: true }));
    }
  };
  useEffect(() => {
    // getProductsData();
    handleCategory();
    dispatch(getProductCategories());
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    getProductsData();
  }, [selectedTab, sortingFilter, page, rowsPerPage]);

  useEffect(() => {
    setSelectedTab(selectedProductTab);
  }, [selectedProductTab]);

  const addItem = (id) => {
    if (!cartItems?._id) {
      dispatch(
        createCart({
          userId: ENV.getUserKeys("_id")?._id,
          items: [{ productId: id, quantity: 1 }],
        })
      );
      return;
    }

    dispatch(addCartItem({ id: cartItems._id, productId: id, quantity: 1 }));
  };
  const handleChange = (event) => {
    const val = event.target.value;
    setSelectedCategory(val);
    setPage(0);
    window.history.replaceState(null, "", `/souvenirs/category/${val}`);
    if (val != "all") {
      dispatch(
        getProducts({
          categoryId: val,
          printable: selectedTab === "all-product" ? false : true,
          priceOrder: sortingFilter !== "default" ? sortingFilter : "",
          page: 1,
          limit: rowsPerPage,
        })
      );
    } else {
      dispatch(
        getProducts({
          printable: selectedTab === "all-product" ? false : true,
          priceOrder: sortingFilter !== "default" ? sortingFilter : "",
          page: page + 1,
          limit: rowsPerPage,
        })
      );
    }
  };

  const handleCategory = () => {
    // const category = new URLSearchParams(window.location.search).get(
    //   "category"
    // );
    let categoryId = window.location.pathname.split("/");
    if (categoryId.length > 3) {
      setIsProduct(true);
      setSelectedCategory(categoryId[3]);
      getProductsData();
    } else {
      setIsProduct(false);
    }
  };
  useEffect(() => {
    setCategoriesList(categories);
  }, [categories]);

  return (
    <>
      <Container
        style={{ minHeight: "50vh" }}
        className="justify-content-md-center main-wrapper"
      >
        <Row dir={context.state.locale === "sa" && "rtl"}>
          {products?.length > 0 ? (
            <>
              {products.map(
                (product, i) =>
                  product.Product && (
                    <Col xs={12} lg={3} md={4} sm={6} key={product.Product.id}>
                      <Card className="pb-1 mb-4 px-2 py-1">
                        <div
                          style={{
                            height: 280,
                            backgroundImage: `url(${
                              product.Product?.ProductImage?.length > 0
                                ? `https://drbdesignksa.daftra.com/${product.Product.ProductImage[0].file_full_path}`
                                : product.Product?.ProductImageS3?.length > 0 && product.Product.ProductImageS3[0].file_full_path
                            })`,
                            width: "100%",
                            cursor: "pointer",
                            padding: 16,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                          onClick={() =>
                            navigate(`/souvenirs/${product?.Product?.id}`)
                          }
                        >
                        </div>
                        <CardContent className="mt-1 px-3">
                          <p className="mb-2 mt-1 title-wrap text-capitalize">
                            {product.Product.name}
                          </p>
                          <div className="d-flex mt-3">
                            <div className="m-auto w-100">
                              <b style={{ color: "#4f489e" }}>
                                SR{" "}
                                {parseFloat(
                                  product.Product?.unit_price
                                ).toFixed(2)}
                              </b>
                            </div>

                            <div className="d-flex ml-auto">
                              <div
                                className="pointer"
                                onClick={() =>
                                  navigate(`/souvenirs/${product.Product.id}`)
                                }
                              >
                                <CartSvg width={22} height={22} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>
                  )
              )}
              <div className="product-paginate">
                <TablePagination
                  component="div"
                  count={pagination.totalProducts || 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage={<FormattedMessage id="Rows per page:" />}
                  style={
                    context.state.locale === "sa"
                      ? { fontFamily: "Noto Naskh Arabic" }
                      : {}
                  }
                />
              </div>
            </>
          ) : (
            <h2 className="text-center mt-5">
              {" "}
              {isProductLoading ? (
                "Loading..."
              ) : (
                <FormattedMessage id="Products not found" />
              )}
            </h2>
          )}
        </Row>
        <Backdrop
          sx={{
            color: "#5ebb45",
            marginTop: products?.length > 0 ? -5 : -46,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isProductLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          closeModal={() => setSelectedProduct(null)}
          addCartItem={(id) => addItem(id)}
        />
      )}
    </>
  );
};

export default Products;
