import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as reviewConst from "../store/actionContants/ReviewsConstants";
import "./addReview.css";
import {
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Container,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import * as dispatches from "../store/actions/reviewsActions";
import Message from "./Message";
import Spiner from "./Spinner";
import Ratings from "./Ratings";
import Rating from "@material-ui/lab/Rating";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import { withRouter } from "react-router-dom";

const AddReviews = ({ history }) => {
  const reviewState = useSelector((state) => state.getReviews);
  const addReviewState = useSelector((state) => state.addReviews);
  const { id } = useParams();
  const { succ, loading, error } = addReviewState;
  const [comment, setComment] = useState("");
  const [rate, setRate] = React.useState(0);
  const { reviews, ratings, numReviews } = reviewState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatches.getReviews(id));
  }, [dispatch]);
  useEffect(() => {
    if (succ) {
      dispatch({
        type: reviewConst.ADD_REVIEW_RESET,
      });
      history.push(`/product/${id}/reviews`);
    }
  }, [dispatch, succ, id]);

  const review = {
    rating: rate,
    comment: comment,
  };
  const addReviewHandler = (e) => {
    e.preventDefault();
    dispatch(dispatches.addReview(review, id));
  };
  return (
    <Container>
      <KeyboardBackspaceIcon
        className="d-none d-md-block"
        fontSize="large"
        onClick={() => {
          history.goBack();
        }}
        style={{
          cursor: "pointer",
        }}
      />
      <KeyboardBackspaceIcon
        className="d-block d-md-none"
        fontSize="small"
        onClick={() => {
          history.goBack();
        }}
        style={{
          cursor: "pointer",
        }}
      />
      {error && <Message>{error}</Message>}
      {loading && <Spiner />}
      <Row className="bg-white py-5 rounded">
        <Col md={3} className="mb-2">
          <Card
            className="text-center py-3 px-3"
            style={{
              backgroundColor: "#F1F7FB",
            }}
          >
            <h5>Average Rating</h5>
            <h1 className="mt-2">{ratings}</h1>
            <p
              style={{
                color: "rgb(167,168,168)",
                fontWeight: "normal",
              }}
            >
              out of 5 stars
            </p>
            <div>
              <Ratings value={ratings} />
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Form
            onSubmit={(e) => {
              addReviewHandler(e);
            }}
          >
            <strong>
              <p>Write A Review</p>
            </strong>
            <p
              style={{
                color: "rgb(167,168,168)",
                fontWeight: "normal",
                marginBottom: "0px",
              }}
            >
              Choose A Rating
            </p>
            <Rating
              name="simple-controlled"
              value={rate}
              onChange={(event, newValue) => {
                setRate(newValue);
              }}
            />
            <Form.Group controlId="review">
              <Form.Control
                className="mt-2"
                rows={3}
                as="textarea"
                placeholder="Write A review..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </Form.Group>
            <div>
              <button className="butt add_butt" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(AddReviews);
