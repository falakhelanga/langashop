import * as constants from "../actionContants/ReviewsConstants";

import axios from "axios";

export const getReviews = (id) => async (dispatch) => {
  dispatch({
    type: constants.GET_REVIEW_INIT,
  });

  try {
    const { data } = await axios.get(
      `http://localhost:500/api/products/${id}/review`
    );

    console.log(data);
    dispatch({
      type: constants.GET_REVIEW_SUCC,
      reviews: data.reviews,
      ratings: data.ratings,
      numReviews: data.numReviews,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_REVIEW_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const addReview = (rate, id) => async (dispatch, getState) => {
  dispatch({
    type: constants.ADD_REVIEW_INIT,
  });

  try {
    const token = getState().userLogin.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token} `,
      },
    };

    const { data } = await axios.post(
      `http://localhost:500/api/products/${id}/review`,
      rate,
      config
    );

    dispatch({
      type: constants.ADD_REVIEW_SUCC,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: constants.ADD_REVIEW_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
