import { Navigate } from "react-router-dom";
import { ENV } from "./config/config";
const PrivateRoute = (props) => {
  const authed = true;
  // const authed = ENV.getUserKeys("_id")?._id ? true : false; // isauth() returns true or false based on localStorage

  return props.access || authed ? props.children : <Navigate to="/sign-in" />;
};
export default PrivateRoute;
