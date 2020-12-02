import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ page, pages, keyword = "" }) => {
  return (
    <div>
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((curr) => (
            <LinkContainer
              key={curr + 1}
              to={
                keyword
                  ? `/search/?productName=${keyword}/${curr + 1} `
                  : `/page/${curr + 1}`
              }
            >
              <Pagination.Item active={curr + 1 === page}>
                {curr + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default Paginate;
