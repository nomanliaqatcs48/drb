import { ENV } from "../config/config";
import { useEffect } from "react";
import { getChainId } from "../helpers/web3";
import { toast } from "react-toastify";
import Web3 from "web3";
export const useListenMetaMaskAccs = () => {
  useEffect(() => {
    // try {
    //   if (!(window as any)?.ethereum) {
    //     return;
    //   }

    //   const accountWasChanged = async (data: any) => {
    //     console.log("acc is changed==>");
    //     // const connectedChainId = await getChainId();
    //     if (data.length === 0) {
    //       return toast.error("you are not connected with metamask");
    //     }
    //     // toast.info("Your account is changed please login again");
    //     if (
    //       (ENV.getUserKeys("loginType") as { loginType: string })?.loginType ===
    //       "metamask"
    //     ) {
    //     }
    //     // localStorage.removeItem("encuse");
    //   };

    //   (window as any)?.ethereum.on("accountsChanged", accountWasChanged);
    //   (window as any)?.ethereum.on("chainChanged", (chainId: any) => {
    //     if (Web3.utils.hexToNumber(chainId) !== ENV.chainId) {
    //       //   localStorage.removeItem("encuse");
    //     }
    //   });

    //   return () => {
    //     // Clean up event listeners
    //     (window as any)?.ethereum.removeListener(
    //       "accountsChanged",
    //       accountWasChanged
    //     );
    //   };
    // } catch (err) {
    //   console.log(err, "error==>");
    // }
  }, []);
};
