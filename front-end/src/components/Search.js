import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
  },
});

const Search = ({ history }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setSearch("");
      history.push(`/search/?productName=${search} `);
    } else {
      history.push("/");
    }
  };

  const classes = useStyles();
  return (
    <div>
      <form
        className=" d-none d-lg-block"
        onSubmit={(e) => {
          searchHandler(e);
        }}
      >
        <div
          className="text-center "
          style={{
            width: "470px",
            borderRadius: "40px",
            height: "50px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Enter the product name"
            style={{
              border: "none",
              outline: "none",
              width: "80%",
            }}
          />
          <div
            onClick={(e) => {
              searchHandler(e);
            }}
          >
            <SearchIcon className={classes.root} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
