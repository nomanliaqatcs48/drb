import abi from "./mint.json";
import { ENV } from "../../config/config";
const CONTRACT_DETAILS = {
  mint: {
    abi,
    address: ENV.contractAddress,
  },
};
export { CONTRACT_DETAILS };
