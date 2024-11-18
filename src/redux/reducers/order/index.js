const initialState = {
  ordersList: [],
  isOrderLoading: false,
  isCompletionOrder: false,
  isCancellationOrder: false,
  orderPagination: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_ORDERS_LOADING":
      return { ...state, isOrderLoading: true };
    case "SET_ORDERS_LIST":
      return {
        ...state,
        ordersList: action.orders.data,
        orderPagination: action.orders.pagination,
        isOrderLoading: false,
      };
    case "HIDE_ORDERS_LOADING":
      return { ...state, isOrderLoading: false };
    case "SET_COMPLETION_ORDER":
      return { ...state, isCompletionOrder: action.orderCompletion };
    case "SET_CANCELLATION_ORDER":
      return { ...state, isCancellationOrder: action.orderCancellation };

    default:
      return state;
  }
};

export default orderReducer;
