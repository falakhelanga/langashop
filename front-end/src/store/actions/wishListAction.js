import * as constants from "../actionContants/wishListContants";
import axios from "axios";

export const addWishList = (favorate) => async (dispatch, getState) => {
  dispatch({ type: constants.ADD_WISH_LIST_INIT });

  try {
    const token = getState().userLogin.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.post(
      "http://localhost:500/api/register/wishlist",
      favorate,
      config
    );

    dispatch({
      type: constants.ADD_WISH_LIST_SUCC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.ADD_WISH_LIST_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWishList = () => async (dispatch, getState) => {
  dispatch({ type: constants.GET_WISH_LIST_INIT });

  try {
    const token = getState().userLogin.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.get(
      "http://localhost:500/api/register/wishlist",

      config
    );

    dispatch({
      type: constants.GET_WISH_LIST_SUCC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_WISH_LIST_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWishList = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.DEL_WISH_LIST_INIT });

  try {
    const token = getState().userLogin.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:500/api/register/wishlistdel",
      id,
      config
    );

    dispatch({
      type: constants.DEL_WISH_LIST_SUCC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.DEL_WISH_LIST_FAIL,

      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
