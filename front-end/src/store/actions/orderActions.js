import * as constants from "../actionContants/orderAction";
import * as cartConstants from "../actionContants/cartConstants";
import axios from "axios";
export const addOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: constants.ADD_ORDER_INIT,
  });

  try {
    const token = getState().userLogin.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.post(
      "http://localhost:500/api/orders/",
      order,
      config
    );
    console.log(data._id);
    dispatch({
      type: constants.ADD_ORDER_SUCCESS,
      payload: data._id,
    });

    dispatch({
      type: cartConstants.RESET_TO_CART,
    });
    dispatch({
      type: constants.ADD_ORDER_RESET,
    });
  } catch (error) {
    dispatch({
      type: constants.ADD_ORDER_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrder = () => async (dispatch, getState) => {
  dispatch({
    type: constants.GET_ORDER_INIT,
  });

  try {
    const token = getState().userLogin.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.get(
      "http://localhost:500/api/orders/",

      config
    );

    dispatch({
      type: constants.GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_ORDER_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleOrder = (id) => async (dispatch, getState) => {
  dispatch({
    type: constants.GET_SINGLE_ORDER_INIT,
  });

  try {
    const token = getState().userLogin.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.get(
      `http://localhost:500/api/orders/${id}`,

      config
    );

    dispatch({
      type: constants.GET_SINGLE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_SINGLE_ORDER_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderPay = (order, id) => async (dispatch, getState) => {
  try {
    const token = getState().userLogin.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.post(
      `http://localhost:500/api/orders/pay/${id}`,
      order,
      config
    );

    dispatch({
      type: constants.ORDER_PAY,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.ORDER_PAY_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
