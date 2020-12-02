import * as constants from "../actionContants/userConstants";
import * as cartActions from "../actions/cartActions";
import * as paymentConstant from "../actionContants/paymentContants";
import * as shipmentConstant from "../actionContants/shipmentConstants";
import * as wishListConstants from "../actionContants/wishListContants";
import * as wishListActions from "./wishListAction";

import axios from "axios";

export const userLogin = (user) => async (dispatch) => {
  dispatch({
    type: constants.USER_LOGIN_INIT,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:500/api/register/login",
      user,
      config
    );

    const token = data.token;

    dispatch({
      type: constants.USER_LOGIN_SUCCESS,
      user: {
        name: data.name,
        email: data.email,
      },
      isAdmin: data.isAdmin,
      token: token,
    });

    const localUser = JSON.stringify(data);
    const localToken = JSON.stringify(token);
    const localAdmin = JSON.stringify(data.isAdmin);

    localStorage.setItem("user", localUser);
    localStorage.setItem("token", localToken);
    localStorage.setItem("admin", localAdmin);
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogOut = () => (dispatch) => {
  dispatch(cartActions.resetcart());
  dispatch({
    type: paymentConstant.PAYMENT_RESET,
  });
  dispatch({
    type: shipmentConstant.RESET_SHIPMENT,
  });
  dispatch({
    type: constants.USER_LOGOUT,
  });

  dispatch({
    type: wishListConstants.WISH_LIST_RESET,
  });

  localStorage.setItem("shipment", JSON.stringify({}));
  localStorage.setItem("payment", JSON.stringify(null));

  const localUser = JSON.stringify({});
  const localToken = JSON.stringify(null);
  const localAdmin = JSON.stringify(false);

  localStorage.setItem("user", localUser);
  localStorage.setItem("token", localToken);
  localStorage.setItem("admin", localAdmin);
};

export const userRegister = (user) => async (dispatch) => {
  dispatch({
    type: constants.USER_REGISTER_INIT,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:500/api/register/",
      user,
      config
    );

    dispatch({
      type: constants.USER_REGISTER_SUCCESS,
      user: data,
    });

    const token = data.token;
    dispatch({
      type: constants.USER_LOGIN_SUCCESS,
      user: {
        name: data.name,
        email: data.email,
      },
      isAdmin: data.isAdmin,
      token: token,
    });

    const localUser = JSON.stringify(data);
    const localToken = JSON.stringify(token);
    const localAdmin = JSON.stringify(data.isAdmin);

    localStorage.setItem("user", localUser);
    localStorage.setItem("token", localToken);
    localStorage.setItem("admin", localAdmin);
  } catch (error) {
    dispatch({
      type: constants.USER_REGISTER_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
