import React from "react";
import { Alert } from "react-bootstrap";

const message = ({ children, variant }) => {
  return (
    <>
      <Alert variant={variant}>{children}</Alert>
    </>
  );
};

message.defaultProps = {
  variant: "danger",
};
export default message;
