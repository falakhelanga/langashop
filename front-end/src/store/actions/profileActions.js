import * as constants from "../actionContants/userConstants";

import axios from "axios";

export const getProfile = () => async (dispatch, getState) => {
  dispatch({
    type: constants.USER_PROFILE_INIT,
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
      "http://localhost:500/api/register/profile",
      config
    );

    dispatch({
      type: constants.USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.USER_PROFILE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const profileUpdate = (user) => async (dispatch, getState) => {
  dispatch({
    type: constants.USER_PROFILE_UPDATE_INIT,
  });

  try {
    const token = getState().userLogin.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.put(
      "http://localhost:500/api/register/profile",
      user,
      config
    );

    dispatch({
      type: constants.USER_PROFILE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.USER_PROFILE_UPDATE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
