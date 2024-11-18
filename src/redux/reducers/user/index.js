const initialState = {
  nftAddresses: [],
  userInfo: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userInfo: action.userInfo };  
    default:
      return state;
  }
};

export default userReducer;
