import * as constants from "../actionContants/userConstants";

export const userLogin = (
  state = {
    user: {},
    token: null,
    isAdmin: false,
  },
  action
) => {
  switch (action.type) {
    case constants.USER_LOGIN_INIT:
      return {
        loading: true,
      };

    case constants.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.user,
        token: action.token,
        isAdmin: action.isAdmin,
      };
    case constants.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    case constants.USER_LOGOUT:
      return {
        user: {},
        token: null,
      };
    default:
      return state;
  }
};

export const userRegister = (
  state = {
    user: {},
  },
  action
) => {
  switch (action.type) {
    case constants.USER_REGISTER_INIT:
      return {
        loading: true,
      };
    case constants.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.user,
      };

    case constants.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
