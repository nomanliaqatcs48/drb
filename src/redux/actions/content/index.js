import { getRequest } from "../../utils/request";

export const getHomePageContent = () => async (dispatch) => {
  await getRequest("/content")
    .then((response) => {
      dispatch({ type: "SET_HOME_PAGE_CONTENT", content: response});
    })
    .catch((error) => {
      console.log(error);
    });
};
