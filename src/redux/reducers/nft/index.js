const initialState = {
  nftAddresses: {},
  isNFTMinting: false,
  metadata: null,
  nftLoading: false,
  nfts: [],
};

const nftReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NFT_ADDRESSES":
      return { ...state, nftLoading: true };
    case "SET_NFT_ADDRESSES_SUCCESS":
      const new_array = [...state.nfts, ...action.nftAddresses.data];
      return { ...state, nftAddresses: action.nftAddresses, nfts: new_array, nftLoading: false };
    case "SET_NFT_ADDRESSES_FAILURE":
      return { ...state, nftLoading: false };
    case "SHOW_MINTING_LOADING":
      return { ...state, isNFTMinting: true };
    case "HIDE_MINTING_LOADING":
      return { ...state, isNFTMinting: false };
    case "SET_METADATA":
      return { ...state, metadata: action.metadata };
    case "CLEAR_METADATA":
      return { ...state, metadata: null };
    case "CLEAR_NFT":
      return { ...state, nftAddresses: {}, nfts: [] };
    default:
      return state;
  }
};

export default nftReducer;
