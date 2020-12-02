import * as constants from "../../actionContants/adminContants/ordersContants";

export const getOrders = (
  state = {
    orders: [],
  },
  action
) => {
  switch (action.type) {
    case constants.GET_ORDERS_INIT:
      return {
        loading: true,
      };
    case constants.GET_ORDERS_SUCC:
      return {
        loading: false,
        orders: action.payload,
      };
    case constants.GET_ORDERS_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const orderDeliver = (
  state = {
    Succ: false,
  },
  action
) => {
  switch (action.type) {
    case constants.ORDER_DELIVERED_INIT:
      return {
        loading: true,
      };
    case constants.ORDER_DELIVERED_SUCC:
      return {
        loading: false,
        Succ: true,
        message: action.payload,
      };
    case constants.ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case constants.ORDER_DELIVERED_RESET:
      return {
        Succ: false,
      };
    default:
      return state;
  }
};
