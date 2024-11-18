import { postRequest } from "../../utils/request";
import { ENV } from "../../../config/config";

export const getOrders = (page, limit, status) => async (dispatch) => {
  dispatch({ type: "SHOW_ORDERS_LOADING" });
  let url = `/order/all?page=${page + 1}&limit=${limit}&sortBy=createdAt`;
  if (status !== "all") {
    url += `&status=${status}`;
  }
  await postRequest(url, { userId: ENV.getUserKeys("_id")?._id })
    .then((response) => {
      dispatch({ type: "SET_ORDERS_LIST", orders: response });
    })
    .catch((error) => {
      dispatch({ type: "HIDE_ORDERS_LOADING" });
      console.log(error);
    });
};

export const setOrderCompletion = (orderCompletion) => async (dispatch) => {
  dispatch({ type: "SET_COMPLETION_ORDER", orderCompletion });
};

export const setOrderCancellation = (orderCancellation) => async (dispatch) => {
  dispatch({ type: "SET_CANCELLATION_ORDER", orderCancellation });
};
