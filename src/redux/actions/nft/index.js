import { getRequest, postRequest } from "../../utils/request";
import { toast } from "react-toastify";

export const getNFTAddresses = (address, pageKey) => async (dispatch) => {
  dispatch({ type: "SET_NFT_ADDRESSES" });
  let url = `/NFTs?${address ? "address=" + address : "marketplace=true&user=true"}`;
  if (pageKey) {
    url += `&pageKey= ${pageKey}&pageSize=10`;
  }
  await getRequest(url)
    .then((response) => {
      const nftAddresses = response?.data.filter(
        (nft) =>
          (nft?.media.length > 0 && nft?.media[0]?.thumbnail) ||
          nft?.metadata?.image
      );
      response.data = nftAddresses;
      dispatch({ type: "SET_NFT_ADDRESSES_SUCCESS", nftAddresses: response });
    })
    .catch((error) => {
      dispatch({ type: "SET_NFT_ADDRESSES_FAILURE" });
      console.log(error);
    });
};

export const clearNFT = () => async (dispatch) => {
  dispatch({ type: "CLEAR_NFT" });
};
export const uploadMetaDataOnIpfs = (data) => async (dispatch) => {
  dispatch({ type: "SHOW_MINTING_LOADING" });
  await postRequest("/mint", data)
    .then((response) => {
      console.log(response, "ipfs response=>");
      dispatch({
        type: "SET_METADATA",
        metadata: {
          metaDataUrl: response.data.metaDataUrl,
          data: response.data.data,
        },
      });
    })
    .catch((error) => {
      dispatch({ type: "HIDE_MINTING_LOADING" });
      toast.error(error?.message);
      console.log(error, "error while mintinng nft");
    });
};

export const clearMetaData = () => async (dispatch) => {
  dispatch({ type: "CLEAR_METADATA" });
};
export const hideLoading = () => async (dispatch) => {
  dispatch({ type: "HIDE_MINTING_LOADING" });
};
