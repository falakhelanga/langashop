import * as constants from "../../actionContants/adminContants/usersConstants";

export const getUsersReducer = (
  state = {
    users: [],
  },
  action
) => {
  switch (action.type) {
    case constants.GET_USERS_INIT:
      return {
        loading: true,
      };
    case constants.GET_USERS_SUCC:
      return {
        loading: false,
        users: action.payload,
      };
    case constants.GET_USERS_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const deleteUser = (
  state = {
    successDelete: false,
    user: null,
  },
  action
) => {
  switch (action.type) {
    case constants.DELETE_USER_INIT:
      return {
        loading: true,
      };
    case constants.DELETE_USER:
      return {
        successDelete: true,
        loading: false,
        user: action.payload,
      };
    case constants.DELETE_USER_FAIL:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export const getUserReducer = (
  state = {
    user: null,
  },
  action
) => {
  switch (action.type) {
    case constants.GET_USER_INIT:
      return {
        loading: true,
      };
    case constants.GET_USER_SUCC:
      console.log(action.payload);
      return {
        loading: false,
        user: action.payload,
      };
    case constants.GET_USER_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case constants.GET_USER_RESET:
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const UpdateUserReducer = (
  state = {
    updateSucc: false,
    edited: "",
  },
  action
) => {
  switch (action.type) {
    case constants.USER_EDIT_INIT:
      return {
        loading: true,
      };
    case constants.USER_EDIT_SUCC:
      return {
        loading: false,
        updateSucc: true,
        edited: action.payload,
      };
    case constants.USER_EDIT_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case constants.USER_EDIT_RESET:
      return {
        updateSucc: false,
        edited: "",
      };
    default:
      return state;
  }
};
