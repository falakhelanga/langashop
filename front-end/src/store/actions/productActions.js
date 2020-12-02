import * as constants from "../actionContants/productsContants";
import axios from "axios";

export const fetchProducts = (productName = "", page = "") => async (
  dispatch,
  getState
) => {
  dispatch({
    type: constants.FETCH_PRODUCT_iNIT,
  });
  try {
    const { data } = await axios.get(
      `http://localhost:500/api/products/?productName=${productName}&page=${page}`
    );

    dispatch({
      type: constants.FETCH_PRODUCT_SUCCESS,
      payload: data,
    });
    const localStorageProducts = JSON.stringify(
      getState().fetchProducts.productList
    );
    localStorage.setItem("products", localStorageProducts);
  } catch (error) {
    dispatch({
      type: constants.FETCH_PRODUCT_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  dispatch({
    type: constants.FETCH_SINGLE_PRODUCT_iNIT,
  });

  try {
    const { data } = await axios.get(`http://localhost:500/api/products/${id}`);
    console.log(data.detailsImage);
    dispatch({
      type: constants.FETCH_SINGLE_PRODUCT_SUCCESS,
      payload: data,
      imageList: data.detailsImage,
    });
  } catch (error) {
    dispatch({
      type: constants.FETCH_SINGLE_PRODUCT_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchDiscount = () => async (dispatch) => {
  dispatch({
    type: constants.FETCH_DISCOUNT_PRODUCT_iNIT,
  });
  try {
    const { data } = await axios.get(
      "http://localhost:500/api/products/discount"
    );

    dispatch({
      type: constants.FETCH_DISCOUNT_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.FETCH_DISCOUNT_PRODUCT_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
