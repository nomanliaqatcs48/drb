import axios from "axios";
import { ENV } from "../../config/config";

const handleError = (error) => {
  // if (error.response.status === 401) {
  //   const a = document.createElement("a");
  //   a.href = "/logout";
  //   a.click();
  // }
  if (error.response.status >= 400 && error.response.status < 500) {
    if (typeof error.response.data.message === "object") {
      throw new Error(Object.values(error.response.data.message)[0]);
    } else if (Array.isArray(error.response.data.message)) {
      throw new Error(error.response.data.message[0]);
    } else if (typeof error.response.data.message === "string") {
      throw new Error(error.response.data.message);
    }
  }
  throw new Error("Something went wrong!");
};
const getHeaders=()=>{
  const baseHeaders = {
    Authorization: `Bearer ${ENV.getUserKeys("accessToken").accessToken}`,
  };
  return baseHeaders
}

export const postRequest = (url, formData) => {
 
  return axios
    .post(url, formData, { headers: getHeaders() })
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

export const putRequest = (url, formData) => {
 
  return  axios
    .put(url, formData, { headers: getHeaders() })
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

export const patchRequest = (url, formData) => {
 
  return axios
    .patch(url, formData, { headers: getHeaders() })
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

export const getRequest = (url, params) => {
  console.log(ENV.getUserKeys("accessToken").accessToken, "token==>");
 
  return axios
    .get(url, { params, headers: getHeaders() })
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

export const deleteRequest = (url, data) => {
 
 return axios
    .delete(url, { data, headers: getHeaders() })
    .then((response) => response.data)
    .catch((error) => handleError(error));
};

export const recoverRequest = (url, data) => {
 
  return axios
    .post(url, { data, headers: getHeaders() })
    .then((response) => response.data)
    .catch((error) => handleError(error));
};
