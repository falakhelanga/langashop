import * as constants from "../../actionContants/adminContants/usersConstants";
import axios from "axios";

export const getUsers = () => async (dispatch, getState) => {
  dispatch({
    type: constants.GET_USERS_INIT,
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
      "http://localhost:500/api/admin/users/",
      config
    );

    dispatch({
      type: constants.GET_USERS_SUCC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_USERS_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: constants.DELETE_USER_INIT,
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
      `http://localhost:500/api/admin/users/${id}`,
      config
    );

    dispatch({
      type: constants.DELETE_USER,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: constants.DELETE_USER_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: constants.GET_USER_INIT,
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
      `http://localhost:500/api/admin/users/${id}`,
      config
    );
    console.log(data.name);
    dispatch({
      type: constants.GET_USER_SUCC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_USER_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const editUser = (id, user) => async (dispatch, getState) => {
  dispatch({
    type: constants.USER_EDIT_INIT,
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
      `http://localhost:500/api/admin/users/${id}`,
      user,
      config
    );
    console.log("doo");
    dispatch({
      type: constants.USER_EDIT_SUCC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.USER_EDIT_FAIL,
      error: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
