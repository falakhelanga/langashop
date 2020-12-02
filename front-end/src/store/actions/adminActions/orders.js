import * as constants from "../../actionContants/adminContants/ordersContants";
import axios from "axios";

export const getOrders = () => async (dispatch, getState) => {
  dispatch({
    type: constants.GET_ORDERS_INIT,
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
      "http://localhost:500/api/admin/orders/",
      config
    );

    dispatch({
      type: constants.GET_ORDERS_SUCC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_ORDERS_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
      // ? error.response.data.message
      // : error.message,
    });
  }
};

export const orderDeliver = (id) => async (dispatch, getState) => {
  dispatch({
    type: constants.ORDER_DELIVERED_INIT,
  });
  try {
    const token = getState().userLogin.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:500/api/admin/orders/${id}`,
      null,
      config
    );

    dispatch({
      type: constants.ORDER_DELIVERED_SUCC,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: constants.ORDER_DELIVERED_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
