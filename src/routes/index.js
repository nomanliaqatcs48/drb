import Home from "../pages/home";
import Explore from "../pages/explore";
import ContactUs from "../pages/contactUs";
import Auth from "../pages/auth";
import HomeLayout from "../layouts/homeLayout";
import Layout from "../layouts/signInLayout";
import Products from "../pages/products";
import ProductCategory from "../pages/productCategory";
import Checkout from "../pages/checkout";
import OrdersHistory from "../pages/ordersHistory";
import UnityEnvironment from "../pages/environement";
import ProductDetail from "../components/productDetail";
import NftMint from "../pages/nftMint";
import Profile from "../pages/profile";
import ProductGift from "../pages/giftProducts";
import ResetPassword from "../pages/resetPassword";
import OrderSuccess from "../pages/orderSuccess";

export const routes = [
  {
    path: "/",
    access: false,
    exact: true,
    title: "home",
    layout: HomeLayout,
    component: Home,
  },
  {
    path: "/sign-in",
    access: true,
    exact: true,
    title: "signIn",
    layout: Layout,
    component: Auth,
  },
  {
    path: "/sign-up",
    access: true,
    exact: true,
    title: "signUp",
    layout: Layout,
    component: Auth,
  },
  {
    // path: "/reset-password/:uid/:token",
    path: "/reset-password",
    access: true,
    exact: true,
    title: "signUp",
    layout: Layout,
    component: ResetPassword,
  },
  {
    path: "/contact-us",
    access: false,
    exact: true,
    title: "contactUs",
    layout: HomeLayout,
    component: ContactUs,
  },
  {
    path: "/explore",
    access: false,
    exact: true,
    title: "explore",
    layout: HomeLayout,
    component: Explore,
  },
  {
    path: "/souvenirs",
    access: false,
    exact: true,
    title: "products",
    layout: HomeLayout,
    component: ProductCategory,
  },
  {
    path: "/souvenirs/category/:id",
    access: false,
    exact: true,
    title: "products",
    layout: HomeLayout,
    component: Products,
  },
  {
    path: "/souvenirs/:id",
    access: false,
    exact: true,
    title: "products",
    layout: HomeLayout,
    component: ProductDetail,
  },
  {
    path: "/gift",
    access: false,
    exact: true,
    title: "products",
    layout: HomeLayout,
    component: ProductGift,
  },
  {
    path: "/checkout",
    access: false,
    exact: true,
    title: "checkout",
    layout: HomeLayout,
    component: Checkout,
  },
  {
    path: "/checkout/success",
    access: false,
    exact: true,
    title: "thankYou",
    layout: HomeLayout,
    component: OrderSuccess,
  },
  {
    path: "/orders",
    access: false,
    exact: true,
    title: "orders",
    layout: HomeLayout,
    component: OrdersHistory,
  },
  {
    path: "/account",
    access: false,
    exact: true,
    title: "account",
    layout: HomeLayout,
    component: Profile,
  },
  {
    path: "/nft-mint",
    access: false,
    exact: true,
    title: "nft",
    layout: HomeLayout,
    component: NftMint,
  },
  {
    path: "/environment",
    access: true,
    exact: true,
    title: "environment",
    layout: Layout,
    component: UnityEnvironment,
  },
];
