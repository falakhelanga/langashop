import React from "react";
import { Spinner } from "react-bootstrap";

const spinner = () => {
  return (
    <div className="text-center  ">
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: " 50px auto",
          display: "block",
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default spinner;
