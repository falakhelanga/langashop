import * as constants from "../actionContants/paymentContants";

export const paymentMethod = (method) => (dispatch, getState) => {
  dispatch({
    type: constants.PAYMENT_METHOD,
    payload: method,
  });
  localStorage.setItem(
    "payment",
    JSON.stringify(getState().paymentReducer.paymentMethod)
  );
};
