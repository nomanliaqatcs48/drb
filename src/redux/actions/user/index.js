import { getRequest, patchRequest } from "../../utils/request";
import { toast } from "react-toastify";
import { ENV } from "../../../config/config";

export const getUser = () => async (dispatch) => {
  if(!ENV.getUserKeys("_id")?._id) return;
  await getRequest(`/user/${ENV.getUserKeys("_id")?._id}`)
    .then((response) => {
      dispatch({ type: "SET_USER", userInfo: response.user});
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUser = (formData, type) => async (dispatch) => {
  await patchRequest(`/user/update/${ENV.getUserKeys("_id")?._id}`, formData)
    .then((response) => {
      dispatch({ type: "SET_USER", userInfo: response.user});
      !["checkout", "dropdown"].includes(type) && toast.success("Profile updated successfully!");
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message)
    });
};
