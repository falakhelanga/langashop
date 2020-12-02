import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as dispatches from "../store/actions/wishListAction";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

function BottomNav({ addToCartHandler, history, id }) {
  const addWishList = () => {
    dispatch(dispatches.addWishList({ favorate: id }));
  };
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const addwishListState = useSelector((state) => state.addToWishList);
  const userState = useSelector((state) => state.userLogin);
  const { succ } = addwishListState;
  const { token, user, isAdmin } = userState;
  const isAuth = token != null;
  useEffect(() => {
    if (isAuth) {
      dispatch(dispatches.getWishList());
    }
  }, [dispatches, dispatch, succ, isAuth]);
  return (
    <div className="d-block d-md-none">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
        style={{
          width: "100%",
          position: "fixed",
          bottom: "0",
          right: "0",
          zIndex: "1",
          color: "white",
          backgroundColor: " #3289a8",
        }}
      >
        <BottomNavigationAction
          label="Add "
          icon={<AddShoppingCartIcon />}
          style={{
            fontWeight: "bold",
          }}
          onClick={() => {
            addToCartHandler();
          }}
        />

        <BottomNavigationAction
          label=" Cart"
          icon={<ShoppingCartIcon />}
          style={{
            fontWeight: "bold",
          }}
          onClick={() => {
            history.push("/cart");
          }}
        />
        <BottomNavigationAction
          label=" Favorites"
          icon={<FavoriteIcon />}
          style={{
            fontWeight: "bold",
          }}
          onClick={() => {
            addWishList();
          }}
        />
      </BottomNavigation>
    </div>
  );
}

export default withRouter(BottomNav);
