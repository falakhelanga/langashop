import React from "react";
import { Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Information from "./Information";
import Reviews from "./Reviews";
import { Route, Switch, withRouter } from "react-router-dom";
import "./details.css";

const DetailsComp = ({ match, id }) => {
  return (
    <Container className="bg-white mt-2 py-2 " fluid>
      <Container>
        <div
          style={{
            marginTop: "5px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <LinkContainer
            to={`/product/${id}/info`}
            style={{
              fontFamily: "'Oswald', sans-serif",
              cursor: "pointer",
            }}
          >
            <p className="det_link">Product Information</p>
          </LinkContainer>
          <LinkContainer
            to={`/product/${id}/reviews`}
            style={{
              fontFamily: "'Oswald', sans-serif",
              cursor: "pointer",
            }}
          >
            <p className="det_link">Reviews</p>
          </LinkContainer>
        </div>
        <Switch>
          <Route path={`/product/:id/info`} component={Information} />
          <Route path={`/product/:id/reviews`} component={Reviews} />
        </Switch>
      </Container>
    </Container>
  );
};

export default withRouter(DetailsComp);
