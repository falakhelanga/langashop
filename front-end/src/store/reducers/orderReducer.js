import * as constants from "../actionContants/orderAction";

export const addOrder = (
  state = {
    success: false,
    orderId: null,
  },
  action
) => {
  switch (action.type) {
    case constants.ADD_ORDER_INIT:
      return {
        loading: true,
      };
    case constants.ADD_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        orderId: action.payload,
      };
    case constants.ADD_ORDER_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    case constants.ADD_ORDER_RESET:
      return {
        orders: [],
        success: false,
      };

    default:
      return state;
  }
};

export const getOrder = (
  state = {
    orders: null,
  },
  action
) => {
  switch (action.type) {
    case constants.GET_ORDER_INIT:
      return {
        loading: true,
      };
    case constants.GET_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case constants.GET_ORDER_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case constants.GET_ORDER_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};

export const getSingleOrder = (state = { order: null }, action) => {
  switch (action.type) {
    case constants.GET_SINGLE_ORDER_INIT:
      return {
        loading: true,
      };
    case constants.GET_SINGLE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case constants.GET_SINGLE_ORDER_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    case constants.GET_SINGLE_ORDER_RESET:
      return {
        order: null,
      };
    default:
      return state;
  }
};

export const orderPay = (
  state = {
    paySuccess: false,
    result: null,
  },
  action
) => {
  switch (action.type) {
    case constants.ORDER_PAY:
      return {
        paySuccess: true,
        result: action.payload,
      };

    case constants.ORDER_PAY_FAIL:
      return {
        error: action.error,
      };
    case constants.ORDER_PAY_RESET: {
      return {
        paySuccess: false,
        result: null,
      };
    }
    default:
      return state;
  }
};
