import * as constants from "../actionContants/productsContants";

export const fetchProducts = (
  state = {
    productList: [],
  },
  action
) => {
  switch (action.type) {
    case constants.FETCH_PRODUCT_iNIT:
      return { loading: true };
    case constants.FETCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        productList: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case constants.FETCH_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const fetchProduct = (
  state = {
    product: null,
    imageList: [],
  },
  action
) => {
  switch (action.type) {
    case constants.FETCH_SINGLE_PRODUCT_iNIT:
      return { loading: true };
    case constants.FETCH_SINGLE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        imageList: action.imageList,
      };
    case constants.FETCH_PRODUCT_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const fetchDiscount = (
  state = {
    productList: [],
  },
  action
) => {
  switch (action.type) {
    case constants.FETCH_DISCOUNT_PRODUCT_iNIT:
      return { loading: true };
    case constants.FETCH_DISCOUNT_PRODUCT_SUCCESS:
      return { loading: false, productList: action.payload };
    case constants.FETCH_DISCOUNT_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
