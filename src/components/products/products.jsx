import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  addCartItem,
  createCart,
  getProductCategories,
  getProductBrands,
} from "../../redux/actions/product";
import { ENV } from "../../config/config";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductDetailModal from "./productDetailModal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IntlContext } from "../../context/Internationalization";
import { FormattedMessage } from "react-intl";
import { isMobile } from "react-device-detect";
import TablePagination from "@mui/material/TablePagination";
import Filters from "./filters";
import ProductCard from "../common/ProductCard";

let timer;

const debounce = function (fn, d) {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(fn, d);
};

const Products = () => {
  const dispatch = useDispatch();
  const context = useContext(IntlContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedTab, setSelectedTab] = useState();
  const [sortingFilter, setSortingFilter] = useState("default");
  const [isProduct, setIsProduct] = useState(false);
  const [searchByBrand, setSearchByBrand] = useState("");
  const [productList, setProductList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(24);

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
    brandsList,
  } = useSelector((state) => state.product);

  const filterProductsByBrand = (val) => {
    setSearchByBrand(val);
    if (val) {
      const filterProducts = products.filter((pro) =>
        pro.Product.brand.includes(val)
      );
      setProductList(filterProducts);
    } else {
      setProductList(products);
    }
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

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
          categoryId: categoryId !== "all" && categoryId,
          priceOrder: sortingFilter !== "default" ? sortingFilter : "",
          page: page + 1,
          limit: rowsPerPage,
          search: searchValue
        })
      );
    } else {
      dispatch(getProducts({ printable: true }));
    }
  };
  useEffect(() => {
    handleCategory();
    dispatch(getProductCategories());
    dispatch(getProductBrands());
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    getProductsData();
  }, [selectedTab, sortingFilter, page, rowsPerPage]);

 useEffect(() => {
  debounce(async () => {
    getProductsData();
}, 1000);
 },[searchValue])

  const onChangeSearchValue = (val) => {
    setSearchValue(val);
    setSelectedCategory("all");
    setSelectedBrand("all");
    window.history.replaceState(null, "", `/souvenirs/category/all`);
  }

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
    setSearchByBrand("");
    setPage(0);
    window.history.replaceState(null, "", `/souvenirs/category/${val}`);
    if (val != "all") {
      let params = {
        categoryId: val,
        printable: selectedTab === "all-product" ? false : true,
        priceOrder: sortingFilter !== "default" ? sortingFilter : "",
        page: 1,
        limit: rowsPerPage,
      };
      if (selectedBrand != "all") {
        params["brand"] = selectedBrand;
      }
      dispatch(getProducts(params));
    } else {
      let params = {
        printable: selectedTab === "all-product" ? false : true,
        priceOrder: sortingFilter !== "default" ? sortingFilter : "",
        page: page + 1,
        limit: rowsPerPage,
        search: searchValue,
      };
      if (selectedBrand != "all") {
        params["brand"] = selectedBrand;
      }
      dispatch(getProducts(params));
    }
  };

  const brandHandleChange = (event) => {
    const val = event.target.value;
    setSelectedBrand(val);
    setSearchByBrand("");
    setPage(0);
    if (val != "all") {
      let params = {
        brand: val,
        printable: selectedTab === "all-product" ? false : true,
        priceOrder: sortingFilter !== "default" ? sortingFilter : "",
        page: 1,
        limit: rowsPerPage,
        search: searchValue,
      };
      if (selectedCategory != "all") {
        params["categoryId"] = selectedCategory;
      }
      dispatch(getProducts(params));
    } else {
      let params = {
        printable: selectedTab === "all-product" ? false : true,
        priceOrder: sortingFilter !== "default" ? sortingFilter : "",
        page: page + 1,
        limit: rowsPerPage,
        search: searchValue,
      };
      if (selectedCategory != "all") {
        params["categoryId"] = selectedCategory;
      }
      dispatch(getProducts(params));
    }
  };

  const SelectOption = ({ label, name, value, onChange, optionList }) => {
    return (
      <FormControl
        fullWidth
        size="small"
        dir={context.state.locale === "sa" && "rtl"}
      >
        <InputLabel>{<FormattedMessage id={label} />}</InputLabel>
        <Select
          value={value}
          label={<FormattedMessage id={label} />}
          name={name}
          onChange={onChange}
        >
          <MenuItem value="all">All</MenuItem>
          {optionList?.length > 0 &&
            optionList.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  value={
                    name === "category"
                      ? item.CategoriesCategory.id
                      : item.Product.brand
                  }
                  style={
                    context.state.locale === "sa"
                      ? { fontFamily: "Noto Naskh Arabic" }
                      : {}
                  }
                >
                  {name === "category"
                    ? item.CategoriesCategory.name
                    : item.Product.brand}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    );
  };

  const handleCategory = () => {
    // const category = new URLSearchParams(window.location.search).get(
    //   "category"
    // );
    let categoryId = window.location.pathname.split("/");
    if (categoryId.length > 3) {
      setIsProduct(true);
      setSelectedCategory(categoryId[3]);
      // setTimeout(() => {
      getProductsData();
      // },0)
    } else {
      setIsProduct(false);
    }
  };
  useEffect(() => {
    // handleCategory();
    setCategoriesList(categories);
  }, [categories]);

  return (
    <>
      <Container
        style={{ minHeight: "50vh" }}
        className="justify-content-md-center main-wrapper"
      >
        <Filters
          selectedTab={selectedTab}
          SelectCategory={() =>
            SelectOption({
              label: "Select Category",
              name: "category",
              value: selectedCategory,
              onChange: (e) => handleChange(e),
              optionList: categoriesList.filter(c => !c.CategoriesCategory.name.includes("Gift") ),
            })
          }
          SelectBrand={() =>
            SelectOption({
              label: "Select Brand",
              name: "brand",
              value: selectedBrand,
              onChange: (e) => brandHandleChange(e),
              optionList: brandsList,
            })
          }
          sortingFilter={sortingFilter}
          setSortingFilterVal={(e) => {
            setPage(0);
            setSortingFilter(e.target.value);
          }}
          searchByBrand={searchByBrand}
          setSearchByBrand={(value) => filterProductsByBrand(value)}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
        />

        {isMobile && selectedTab === "printable" ? (
          <h2 className="text-center" style={{ marginTop: "7rem" }}>
            <FormattedMessage id="For printable products, Please visit the web version" />
          </h2>
        ) : (
          <Row dir={context.state.locale === "sa" && "rtl"}>
            {productList?.length > 0 ? (
              <>
                {productList.map(
                  (product) =>
                    product.Product && (
                      <Col
                        xs={12}
                        lg={3}
                        md={4}
                        sm={6}
                        key={product.Product.id}
                      >
                        <ProductCard
                          name={product.Product.name}
                          imageUrl={
                            product.Product?.ProductImage?.length > 0
                              ? `https://drbdesignksa.daftra.com/${product.Product.ProductImage[0].file_full_path}`
                              : product.Product?.ProductImageS3?.length > 0 &&
                                product.Product.ProductImageS3[0].file_full_path
                          }
                          redirectUrl={`/souvenirs/${product.Product.id}`}
                          unit_price={product.Product?.unit_price}
                          section="product"
                        />
                      </Col>
                    )
                )}
                <div
                  className="product-paginate"
                  dir={context.state.locale === "sa" && "rtl"}
                >
                  <TablePagination
                    component="div"
                    dir={context.state.locale === "sa" && "rtl"}
                    count={pagination.totalProducts || 0}
                    page={page}
                    rowsPerPageOptions={[24, 48, 72, 96]}
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
        )}
        <Backdrop
          sx={{
            color: "#5ebb45",
            marginTop: productList?.length > 0 ? -5 : -46,
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
