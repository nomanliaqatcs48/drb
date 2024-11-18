const initialState = {
  homePageContent: {}
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HOME_PAGE_CONTENT":
      return { ...state, homePageContent: action.content };  
    default:
      return state;
  }
};

export default contentReducer;
