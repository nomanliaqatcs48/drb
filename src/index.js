import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import axios from "axios";
import { ENV } from "./config/config";
import "leaflet/dist/leaflet.css";
import { store } from "./redux/storeConfig/store";
import { IntlProviderWrapper } from "./context/Internationalization";
import "react-multi-carousel/lib/styles.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={ENV.clientId}>
          <ToastContainer style={{ top: "75px" }} theme="colored" />
          <IntlProviderWrapper>
            <App />
          </IntlProviderWrapper>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
