import React from "react";
import Review from "../components/Reviews";
import { Container } from "react-bootstrap";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const ReviewScreen = ({ history }) => {
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
      <Review />
    </Container>
  );
};

export default ReviewScreen;
