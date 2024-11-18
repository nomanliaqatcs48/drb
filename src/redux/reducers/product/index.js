const initialState = {
  products: [],
  isProductLoading: false,
  cartItems: {},
  isCheckoutLoading: false,
  orderDetails: {},
  categories: [],
  product: null,
  printableProducts: [],
  selectedProductTab: "all-product",
  pagination: {},
  featuredProLoading: false,
  featuredProducts: [],
  productCategories: [],
  productCategoriesLoading: false,
  productGiftCategories: [],
  productGiftCategoriesLoading: false,
  giftBoxLoading: false,
  giftBoxes: [],
  isFBProductLoading: false,
  fbProductsList: [],
  isLoadingUpdateOrder: false,
  updateOrder: null,
  brandsList: [],
  logoList: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_PRODUCTS_LOADING":
      return { ...state, isProductLoading: true };
    case "SET_PRODUCT":
      return { ...state, product: action.product, isProductLoading: false };
    case "SET_PRINTABLES_PRODUCTS":
      return {
        ...state,
        printableProducts: action.printableProducts,
        isProductLoading: false,
      };

    case "SET_PRODUCTS_LIST":
      return {
        ...state,
        products: action.products,
        pagination: action.pagination,
        isProductLoading: false,
      };
    case "HIDE_PRODUCTS_LOADING":
      return { ...state, isProductLoading: false };
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.cartItems };
    case "SHOW_CHECKOUT_LOADING":
      return { ...state, isCheckoutLoading: true };
    case "HIDE_CHECKOUT_LOADING":
      return { ...state, isCheckoutLoading: false };
    case "SET_ORDER_DETAILS":
      return { ...state, orderDetails: action.orderDetails };
    case "GET_PRODUCT_CATEGORIES":
      return { ...state, categories: action.categories };
    case "GET_PRODUCT_BRANDS":
        return { ...state, brandsList: action.brandsList };
    case "SET_PRODUCT_TAB":
      return { ...state, selectedProductTab: action.selectedProductTab };

    case "GET_FEATURED_PRODUCT":
      return { ...state, featuredProLoading: true };
    case "GET_FEATURED_PRODUCT_SUCCESS":
      return {
        ...state,
        featuredProducts: action.featuredProducts,
        featuredProLoading: false,
      };
    case "GET_FEATURED_PRODUCT_FAILURE":
      return { ...state, featuredProLoading: false };
    case "GET_PRODUCT_CATEGORIES_IMAGES":
      return { ...state, productCategoriesLoading: true };
    case "GET_PRODUCT_CATEGORIES_IMAGES_SUCCESS":
      return {
        ...state,
        productCategories: action.productCategories,
        productCategoriesLoading: false,
      };
    case "GET_PRODUCT_CATEGORIES_IMAGES_FAILURE":
      return { ...state, productCategoriesLoading: false };

    case "GET_GIFT_PRODUCT_CATEGORIES_IMAGES":
      return { ...state, productGiftCategoriesLoading: true };
    case "GET_GIFT_PRODUCT_CATEGORIES_IMAGES_SUCCESS":
      return {
        ...state,
        productGiftCategories: action.productGiftCategories,
        productGiftCategoriesLoading: false,
      };
    case "GET_GIFT_PRODUCT_CATEGORIES_IMAGES_FAILURE":
      return { ...state, productGiftCategoriesLoading: false };

    case "GIFT_BOXES":
      return { ...state, giftBoxLoading: true };
    case "GIFT_BOXES_SUCCESS":
      return {
        ...state,
        giftBoxLoading: false,
        giftBoxes: action.giftBoxes,
      };
    case "GIFT_BOXES_FAILURE":
      return { ...state, giftBoxLoading: false };

    case "GET_FB_PRODUCTS":
      return { ...state, isFBProductLoading: true };
    case "GET_FB_PRODUCTS_SUCCESS":
      return {
        ...state,
        isFBProductLoading: false,
        fbProductsList: action.fbProducts,
      };
    case "GET_FB_PRODUCTS_FAILURE":
      return { ...state, isFBProductLoading: false };

    case "UPDATE_ORDER_LOADING":
      return {
        ...state,
        isLoadingUpdateOrder: action.isLoading,
        updateOrder: null,
      };
    case "UPDATE_ORDER_SUCCESS":
      return {
        ...state,
        updateOrder: action.updateOrder,
        isLoadingUpdateOrder: false,
      };
    case "UPDATE_ORDER_FAILURE":
      return { ...state, isLoadingUpdateOrder: false, updateOrder: null };   

    case "GET_LOGO":
      return {
        ...state,
        logoList: action.logoList,
      };

    default:
      return state;
  }
};

export default productReducer;
