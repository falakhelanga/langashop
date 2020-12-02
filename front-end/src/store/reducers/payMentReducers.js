import * as constants from "../actionContants/paymentContants";

export const paymentReducer = (
  state = {
    paymentMethod: null,
  },
  action
) => {
  switch (action.type) {
    case constants.PAYMENT_METHOD:
      return {
        paymentMethod: action.payload,
      };
    case constants.PAYMENT_RESET:
      return {
        paymentMethod: null,
      };
    default:
      return state;
  }
};
