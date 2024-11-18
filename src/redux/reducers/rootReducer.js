import { combineReducers } from "redux";
import product from "./product";
import order from "./order";
import nft from "./nft";
import user from "./user";
import content from "./content";

const rootReducer = combineReducers({
  product,
  order,
  nft,
  user,
  content,
});

export default rootReducer;
