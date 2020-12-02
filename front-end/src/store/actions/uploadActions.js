import * as constants from "../actionContants/uploadsConstants";

import axios from "axios";

export const upload = (image) => async (dispatch) => {
  dispatch({
    type: constants.UPLOAD_INIT,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "http://localhost:500/api/upload/",

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
