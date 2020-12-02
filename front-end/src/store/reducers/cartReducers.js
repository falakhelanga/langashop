import * as constant from "../actionContants/cartConstants";

export const addToCart = (
  state = {
    cart: [],
  },
  action
) => {
  switch (action.type) {
    case constant.ADD_TO_CART:
      const id = action.id;
      const product = action.payload;
      const productFound = state.cart.find((item) => item.productId === id);

      if (!productFound) {
        return {
          cart: [...state.cart, product],
        };
      }

      return {
        cart: state.cart.map((item) => {
          return { ...item, qty: item.id !== id ? product.qty : item.qty };
        }),
      };

    case constant.REMOVE_TO_CART:
      const filterdCart = state.cart.filter(
        (item) => item.productId !== action.id
      );
      return {
        cart: filterdCart,
      };

    case constant.RESET_TO_CART:
      return {
        cart: [],
      };
    default:
      return state;
  }
};
