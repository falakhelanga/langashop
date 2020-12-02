import * as constants from "../actionContants/ReviewsConstants";

export const getReviews = (
  state = { reviews: [], ratings: null, numReviews: null },
  action
) => {
  switch (action.type) {
    case constants.GET_REVIEW_INIT:
      return {
        loading: true,
      };
    case constants.GET_REVIEW_SUCC:
      return {
        loading: false,
        reviews: action.reviews,
        ratings: action.ratings,
        numReviews: action.numReviews,
      };
    case constants.GET_REVIEW_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const addReviews = (state = { succ: false, message: null }, action) => {
  switch (action.type) {
    case constants.ADD_REVIEW_INIT:
      return {
        loading: true,
      };
    case constants.ADD_REVIEW_SUCC:
      return {
        loading: false,
        succ: true,
        message: action.payload,
      };
    case constants.ADD_REVIEW_FAIL:
      return {
        loading: false,
        error: action.error,
      };
    case constants.ADD_REVIEW_RESET:
      return {
        succ: false,
      };
    default:
      return state;
  }
};
