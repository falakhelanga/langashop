import * as constants from "../actionContants/userConstants";

export const getProfile = (
  state = {
    profile: {},
    profileReady: false,
  },
  action
) => {
  switch (action.type) {
    case constants.USER_PROFILE_INIT:
      return {
        loading: true,
      };
    case constants.USER_PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
        profileReady: true,
      };
    case constants.USER_PROFILE_FAIL:
      return {
        loading: false,
        error: action.error,
      };

    case constants.USER_PROFILE_RESET:
      return {
        profile: {},
        profileReady: false,
      };
    default:
      return state;
  }
};

export const profileUpdate = (
  state = { updatedProfile: {}, load: true, updateSuccess: false },
  action
) => {
  switch (action.type) {
    case constants.USER_PROFILE_INIT:
      return {
        load: false,
      };

    case constants.USER_PROFILE_UPDATE_SUCCESS:
      return {
        load: false,
        updateSuccess: true,
        updatedProfile: action.payload,
      };

    case constants.USER_PROFILE_UPDATE_FAIL:
      return {
        load: false,
        error: action.error,
      };
    case constants.USER_PROFILE_UPDATE_RESET:
      return {
        updatedProfile: {
          updateSuccess: false,
          updatedProfile: {},
        },
      };
    default:
      return state;
  }
};
