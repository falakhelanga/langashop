import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import * as dispatches from "../store/actions/reviewsActions";
import Message from "./Message";
import Ratings from "./Ratings";
import { withRouter } from "react-router-dom";

const Reviews = ({ history, match }) => {
  const reviewState = useSelector((state) => state.getReviews);
  const { id } = useParams();
  const { reviews, ratings, numReviews } = reviewState;

  const userState = useSelector((state) => state.userLogin);
  const { token, user } = userState;
  const isAuth = token != null;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dispatches.getReviews(id));
  }, [dispatch]);
  return (
    <>
      <Row>
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
            <Button
              type="button"
              variant="dark"
              className="mt-2"
              onClick={() => {
                if (isAuth) {
                  history.push(`/product/${id}/addreview`);
                } else {
                  history.push(`/signin/${match.url}`);
                }
              }}
            >
              Write A Riview
            </Button>
          </Card>
        </Col>
        <Col md={9}>
          {reviews && (
            <ListGroup variant="flush">
              {reviews.length === 0 ? (
                <Message>This Product Have No Reviews Yet</Message>
              ) : (
                reviews.map((x) => {
                  return (
                    <ListGroup.Item key={x._id}>
                      <Ratings value={x.rating} />{" "}
                      <strong>
                        {" "}
                        <span className="ml-3">{x.user.name}</span>{" "}
                      </strong>
                      <span
                        className="ml-3"
                        style={{
                          color: "rgb(167,168,168)",
                          fontWeight: "normal",
                        }}
                      >
                        {new Date(x.createdAt).toLocaleDateString()}
                      </span>{" "}
                      <p className="mt-2">{x.comment}</p>
                    </ListGroup.Item>
                  );
                })
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
    </>
  );
};

export default withRouter(Reviews);
