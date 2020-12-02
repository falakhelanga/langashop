import * as constants from "../../actionContants/adminContants/productsConstants";
import axios from "axios";

export const getProducts = () => async (dispatch, getState) => {
  dispatch({
    type: constants.GET_PRODUCTS_INIT,
  });
  try {
    const token = getState().userLogin.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      "http://localhost:500/api/admin/products/",
      config
    );

    dispatch({
      type: constants.GET_PRODUCTS_SUCC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_PRODUCTS_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: constants.DELETE_PRODUCT_INIT,
  });
  try {
    const token = getState().userLogin.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:500/api/admin/products/${id}`,
      config
    );

    dispatch({
      type: constants.DELETE_PRODUCT,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: constants.DELETE_PRODUCT_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: constants.CREATE_PRODUCTS_INIT,
  });
  try {
    const token = getState().userLogin.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "http://localhost:500/api/admin/products/",
      product,
      config
    );

    dispatch({
      type: constants.CREATE_PRODUCTS_SUCC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.CREATE_PRODUCTS_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
