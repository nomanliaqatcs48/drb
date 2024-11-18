import { ENV } from "../config/config";
import axios from "axios";
import { toast } from "react-toastify";
export const handleRequest = async (method, endpoint, data, params) => {
  try {
    let url = ENV.baseUrl + endpoint;
    // if (qs) url += `?${qs}`;

    return new Promise((resolve, reject) => {
      let headers = {
        Authorization: `Bearer ${ENV.getUserKeys("accessToken").accessToken}`,
        // 'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
        // Authorization: ENV.Authorization,
        // 'x-auth-token': ENV.x_auth_token,
        // 'x-access-token':
        // 	ENV.getUserKeys('accessToken') &&
        // 	ENV.getUserKeys('accessToken').accessToken
        // 		? ENV.getUserKeys('accessToken').accessToken
        // 		: '',
      };
      axios({
        method,
        url,
        ...(data && { data }),
        headers,
        params,
      }).then(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error?.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage =
              error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error("No response received from the server");
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("Error occurred while making the request");
          }
          reject(error);
        }
      );
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const capatilize = (word) => {
  const firstLetter = word.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = word.slice(1);

  return firstLetterCap + remainingLetters;
};

export const isUserAlreadyAdded = (users) => {
  const isUserExist = users?.find(
    (item) => item?._id === ENV.getUserKeys("_id")._id
  );
  return isUserExist ? true : false;
};
