import React from "react";

const Ratings = ({ value, text, color }) => {
  return (
    <>
      <span
        style={{
          color,
        }}
        className={
          value >= 1
            ? "fa fa-star"
            : value >= 0.5
            ? "fa fa-star-half"
            : " far fa-star"
        }
      ></span>
      <span
        style={{
          color,
        }}
        className={
          value >= 2
            ? "fa fa-star"
            : value >= 1.5
            ? "fa fa-star-half"
            : " far fa-star"
        }
      ></span>
      <span
        style={{
          color,
        }}
        className={
          value >= 3
            ? "fa fa-star"
            : value >= 2.5
            ? "fa fa-star-half"
            : "far fa-star"
        }
      ></span>
      <span
        style={{
          color,
        }}
        className={
          value >= 4
            ? "fa fa-star"
            : value >= 3.5
            ? "fa fa-star-half"
            : "far fa-star"
        }
      ></span>
      <span
        style={{
          color,
        }}
        className={
          value >= 5
            ? "fa fa-star"
            : value >= 4.5
            ? "fa fa-star-half"
            : " far fa-star"
        }
      ></span>
      <span>{text}</span>
    </>
  );
};

Ratings.defaultProps = {
  color: "#f8e825",
  text: "",
  value: 0,
};
export default Ratings;
