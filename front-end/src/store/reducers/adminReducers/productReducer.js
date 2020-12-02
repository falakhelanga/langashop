import * as constants from "../../actionContants/adminContants/productsConstants";

export const getAdminProducts = (state = { products: null }, action) => {
  switch (action.type) {
    case constants.GET_PRODUCTS_INIT:
      return {
        loading: true,
      };
    case constants.GET_PRODUCTS_SUCC:
      return {
        loading: false,
        products: action.payload,
      };
    case constants.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const deleteProduct = (
  state = {
    successDelete: false,
    product: null,
  },
  action
) => {
  switch (action.type) {
    case constants.DELETE_PRODUCT_INIT:
      return {
        loading: true,
      };
    case constants.DELETE_PRODUCT:
      return {
        successDelete: true,
        loading: false,
        product: action.payload,
      };
    case constants.DELETE_PRODUCT_FAIL:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export const createAdminProducts = (
  state = { created: false, products: null },
  action
) => {
  switch (action.type) {
    case constants.CREATE_PRODUCTS_INIT:
      return {
        loading: true,
      };
    case constants.CREATE_PRODUCTS_SUCC:
      return {
        loading: false,
        products: action.payload,
        created: true,
      };
    case constants.CREATE_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.error,
        created: false,
      };
    case constants.CREATE_PRODUCTS_RESET:
      return {
        created: false,
        products: null,
      };
    default:
      return state;
  }
};
