import React from "react";
import { Image } from "react-bootstrap";

const DetailImages = ({ image, setImagesrc }) => {
  return (
    <div className={`border my-1 rounded p-1 d-none d-lg-block`}>
      <Image
        onClick={(e) => {
          setImagesrc(image);
          //   setBorderColor("border border-primary");
        }}
        src={image}
        alt={image}
        fluid
        className="my-1"
        style={{
          width: "80px",
          height: "50px",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default DetailImages;
