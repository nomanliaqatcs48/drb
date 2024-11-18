import { getRequest, postRequest, patchRequest } from "../../utils/request";
import { toast } from "react-toastify";
import { ENV } from "../../../config/config";
import { getOrders } from "../order"

export const getProducts = ({categoryId, brand, printable, priceOrder,  page, limit, search}) => async (dispatch) => {
  dispatch({ type: "SHOW_PRODUCTS_LOADING" });
  let url = `/products`;
  if(page && limit){
    url += `?limit=${limit}&page=${page}`;
  }
  if (categoryId) {
    url = `${url}&category=${categoryId}`;
  }
  if (brand) {
    url = `${url}&brand=${brand}`;
  }
  if(priceOrder){
    url = `${url}&priceOrder=${priceOrder}`;
  }
  if(printable){
    url = `${url}?printable=true`;
  }
  if(search){
    url = `${url}&search=${search}`;
  }
  
  await getRequest(url)
    .then((response) => {
      let products = response.data;
      if(priceOrder === 1){
        products= response?.data.sort((a, b) => parseFloat(a.Product?.unit_price) - parseFloat(b.Product?.unit_price));
      } else if(priceOrder === -1){
        products= response?.data.sort((a, b) => parseFloat(b.Product?.unit_price) - parseFloat(a.Product?.unit_price));
      }
      dispatch({ type: "SET_PRODUCTS_LIST", products, pagination: response?.pagination });
    })
    .catch((error) => {
      dispatch({ type: "HIDE_PRODUCTS_LOADING" });
      console.log(error);
    });
};

export const getProduct = (id) => async (dispatch) => {
  dispatch({ type: "SHOW_PRODUCTS_LOADING" });

  await getRequest(`products/${id}`)
    .then((response) => {
      dispatch({ type: "SET_PRODUCT", product: response?.data });
    })
    .catch((error) => {
      dispatch({ type: "HIDE_PRODUCTS_LOADING" });
      console.log(error);
    });
};

export const getFeaturedProducts = () => async (dispatch) => {
  dispatch({ type: "GET_FEATURED_PRODUCT" });

  await getRequest('/feature-product')
    .then((response) => {
      dispatch({ type: "GET_FEATURED_PRODUCT_SUCCESS", featuredProducts: response });
    })
    .catch((error) => {
      dispatch({ type: "GET_FEATURED_PRODUCT_FAILURE" });
      console.log(error);
    });
};

export const getPrintableProducts = () => async (dispatch) => {
  dispatch({ type: "SHOW_PRODUCTS_LOADING" });

  await getRequest(`/products?printable=true`)
    .then((response) => {
      dispatch({ type: "SET_PRODUCTS_LIST", products: response?.data });
    })
    .catch((error) => {
      dispatch({ type: "HIDE_PRODUCTS_LOADING" });
      console.log(error);
    });
};

export const getCartItems = () => async (dispatch) => {
  await getRequest(`/cart/${ENV.getUserKeys("_id")?._id}`)
    .then((response) => {
      if (response?.data?.items?.length > 0) {
        const result = response.data.items.map((item, index) => {
          return {
            ...item,
            productInfo: response.data.productInfo[response.data.productInfo.findIndex(_p => _p.Product.id === item.productId)].Product,
          };
        });
        response.data.items = result;
      }

      dispatch({ type: "SET_CART_ITEMS", cartItems: response?.data });
    })
    .catch((error) => {
      dispatch({ type: "SET_CART_ITEMS", cartItems: [] });
      console.log(error);
    });
};

export const createCart = (data) => async (dispatch) => {
  await postRequest("/cart", data)
    .then((response) => {
      toast.success("Added to cart");
      dispatch(getCartItems());
    })
    .catch((error) => console.log(error));
};

export const addCartItem = (data) => async (dispatch) => {
  await postRequest("/cart/addItem", data)
    .then((response) => {
      toast.success("Added to cart");
      dispatch(getCartItems());
    })
    .catch((error) => toast.error(error.message));
};

export const updateCartItem = (data) => async (dispatch) => {
  await postRequest("/cart/updateCartItem", data)
    .then((response) => {
      dispatch(getCartItems());
    })
    .catch((error) => console.log(error));
};

export const removeCartItem = (data) => async (dispatch) => {
  await postRequest("/cart/removeItem", data)
    .then((response) => {
      dispatch(getCartItems());
    })
    .catch((error) => console.log(error));
};

export const checkoutOrder = (data, paymentData) => async (dispatch) => {
  dispatch({ type: "SHOW_CHECKOUT_LOADING" });
  await postRequest("/order/telr-payment-create", data)
    .then((response) => {
      console.log("response", response);
      // paymentData["orderId"] = response.data._id;
      // dispatch(orderPayment(paymentData));
      dispatch({ type: "HIDE_CHECKOUT_LOADING" });
      response?.payment_url && window.open(response?.payment_url, "_self");
    })
    .catch((error) => {
      toast.error(error.message);
      dispatch({ type: "HIDE_CHECKOUT_LOADING" });
    });
};

export const getOrderDetail = (section) => async (dispatch) => {
  await postRequest("/order/details", {
    userId: ENV.getUserKeys("_id")?._id,
    status: section === "orderHistory" ? "on hold" : "pending",
  })
    .then((response) => {
      dispatch({
        type: "SET_ORDER_DETAILS",
        orderDetails: response?.data || {},
      });
      if(["pending", "on hold"].includes(response?.data?.status) && section !== "checkout") {
        dispatch(updateOrderStatus(section))
      }
    })
    .catch((error) => {
      // toast.error(error.message)
      console.log(error);
    });
};

export const orderPayment = (data) => async (dispatch) => {
  dispatch({ type: "SHOW_CHECKOUT_LOADING" });
  await postRequest("/payment/tap-pay/createSession", data)
    .then((response) => {
      if (response?.data?.transaction?.url) {
        window.open(response.data.transaction.url, "_self");
        // window.open("/products", "_self");
      }
      dispatch({ type: "HIDE_CHECKOUT_LOADING" });
    })
    .catch((error) => {
      toast.error(error.message);
      dispatch({ type: "HIDE_CHECKOUT_LOADING" });
    });
};

export const getProductCategories = (data) => async (dispatch) => {
  await getRequest("/categories")
    .then((response) => {
      dispatch({ type: "GET_PRODUCT_CATEGORIES", categories: response?.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProductBrands = () => async (dispatch) => {
  await getRequest("/products/brands/list")
    .then((response) => {
      dispatch({ type: "GET_PRODUCT_BRANDS", brandsList: response?.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProductCategoriesImages = (data) => async (dispatch) => {
  dispatch({ type: "GET_PRODUCT_CATEGORIES_IMAGES"})
  await getRequest("/product-category")
    .then((response) => {
      dispatch({ type: "GET_PRODUCT_CATEGORIES_IMAGES_SUCCESS", productCategories: response });
    })
    .catch((error) => {
      dispatch({ type: "GET_PRODUCT_CATEGORIES_IMAGES_FAILURE"});
      console.log(error);
    });
};

export const getGiftProductCategoriesImages = () => async (dispatch) => {
  dispatch({ type: "GET_GIFT_PRODUCT_CATEGORIES_IMAGES"})
  await getRequest("/gift-category")
    .then((response) => {
      dispatch({ type: "GET_GIFT_PRODUCT_CATEGORIES_IMAGES_SUCCESS", productGiftCategories: response });
    })
    .catch((error) => {
      dispatch({ type: "GET_GIFT_PRODUCT_CATEGORIES_IMAGES_FAILURE"});
      console.log(error);
    });
};

export const setProductTab = (tab) => async (dispatch) => {
  dispatch({ type: "SET_PRODUCT_TAB", selectedProductTab: tab  });
};

export const getGiftBoxes = () => async (dispatch) => {
  dispatch({ type: "GIFT_BOXES" });

  await getRequest("/gift-category/gift-boxes")
    .then((response) => {
      dispatch({ type: "GIFT_BOXES_SUCCESS", giftBoxes: response });
    })
    .catch((error) => {
      dispatch({ type: "GIFT_BOXES_FAILURE" });
      console.log(error);
    });
};

export const getFBProducts = () => async (dispatch) => {
  dispatch({ type: "GET_FB_PRODUCTS" });

  await getRequest("/feature-product/facebook")
    .then((response) => {
      dispatch({ type: "GET_FB_PRODUCTS_SUCCESS", fbProducts: response });
    })
    .catch((error) => {
      dispatch({ type: "GET_FB_PRODUCTS_FAILURE" });
      console.log(error);
    });
};

export const updateOrderStatus = (section) => async (dispatch) => {
  const data = { userId: ENV.getUserKeys("_id")?._id, currentStatus: section === "orderHistory" ? "on hold" : "pending" }
  dispatch({ type: "UPDATE_ORDER_LOADING", isLoading: true });
  await patchRequest("/order/update", data)
    .then((response) => {
      dispatch(getCartItems());
      section === "orderHistory" && dispatch(getOrders())
      dispatch({ type: "UPDATE_ORDER_SUCCESS", updateOrder: response?.data });
      dispatch({ type: "UPDATE_ORDER_LOADING", isLoading: false });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: "UPDATE_ORDER_LOADING", isLoading: false  });
      dispatch({ type: "UPDATE_ORDER_FAILURE", error });
    });
};

export const getLogo = () => async (dispatch) => {
  await getRequest("/logo")
    .then((response) => {
      dispatch({ type: "GET_LOGO", logoList: response });
    })
    .catch((error) => {
      dispatch({ type: "GET_LOGO_FAILURE" });
      console.log(error);
    });
};
