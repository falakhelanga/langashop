import * as constants from "../actionContants/wishListContants";

export const addToWishList = (
  state = {
    wishList: [],
    succ: false,
  },
  action
) => {
  switch (action.type) {
    case constants.ADD_WISH_LIST_INIT:
      return {
        loading: true,
      };

    case constants.ADD_WISH_LIST_SUCC:
      return {
        loading: false,
        wishList: action.payload,
        succ: true,
      };
    case constants.ADD_WISH_LIST_FAIL:
      return {
        loading: false,
        error: action.error,
        succ: false,
      };

    case constants.WISH_LIST_RESET:
      return {
        wishList: [],
        succ: false,
      };
    default:
      return state;
  }
};

export const getWishLists = (state = { wishList: null }, action) => {
  switch (action.type) {
    case constants.GET_WISH_LIST_INIT:
      return {
        loading: true,
      };
    case constants.GET_WISH_LIST_SUCC:
      return {
        loading: false,
        wishList: action.payload,
      };
    case constants.GET_WISH_LIST_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const deleteToWishList = (
  state = {
    wishList: [],
    succ: false,
  },
  action
) => {
  switch (action.type) {
    case constants.DEL_WISH_LIST_INIT:
      return {
        loading: true,
      };

    case constants.DEL_WISH_LIST_SUCC:
      return {
        loading: false,
        wishList: action.payload,
        succ: true,
      };
    case constants.DEL_WISH_LIST_FAIL:
      return {
        loading: false,
        error: action.error,
        succ: false,
      };

    case constants.DEL_WISH_LIST_RESET:
      return {
        wishList: [],
        succ: false,
      };
    default:
      return state;
  }
};
