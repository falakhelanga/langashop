import * as constants from "../actionContants/uploadsConstants";

export const uploadReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.UPLOAD_INIT:
      return {
        loading: true,
      };
    case constants.UPLOAD_SUCC:
      return {
        loading: false,
        path: action.payload,
      };
    case constants.UPLOAD_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
