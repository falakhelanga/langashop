import { Container } from "react-bootstrap";
import React from "react";
import ProdInfo from "../components/Information";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const ProdInfoScreen = ({ history }) => {
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
      <h3>Product Information</h3>
      <ProdInfo />
    </Container>
  );
};

export default ProdInfoScreen;
