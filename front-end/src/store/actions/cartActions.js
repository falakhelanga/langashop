import * as constants from "../actionContants/cartConstants";

export const addToCart = (product, id) => (dispatch, getState) => {
  dispatch({
    type: constants.ADD_TO_CART,
    id: id,
    payload: product,
  });

  const localStorageCart = JSON.stringify(getState().addToCart.cart);
  localStorage.setItem("cart", localStorageCart);
};

export const removeToCart = (id) => (dispatch, getState) => {
  dispatch({
    type: constants.REMOVE_TO_CART,
    id: id,
  });
  const localStorageCart = JSON.stringify(getState().addToCart.cart);
  localStorage.setItem("cart", localStorageCart);
};

export const resetcart = () => (dispatch) => {
  dispatch({
    type: constants.RESET_TO_CART,
  });
  const localStorageCart = JSON.stringify([]);
  localStorage.setItem("cart", localStorageCart);
};
