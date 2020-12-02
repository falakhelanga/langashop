import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as constant from "../store/actionContants/wishListContants";
import * as dispatches from "../store/actions/wishListAction";
import Message from "../components/Message";
import Spiner from "../components/Spinner";
import * as cartDispatches from "../store/actions/cartActions";
const WishList = ({ history }) => {
  const wishListState = useSelector((state) => state.getWishLists);
  const userState = useSelector((state) => state.userLogin);
  const delState = useSelector((state) => state.deleteToWishList);

  const { token } = userState;
  const { wishList, loading, error } = wishListState;
  const {
    wishList: delWishList,
    loading: delLoader,
    error: dellError,
    succ,
  } = delState;

  const isAuth = token != null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }
    dispatch(dispatches.getWishList());
  }, [isAuth, dispatch, dispatches]);

  useEffect(() => {
    if (succ) {
      dispatch(dispatches.getWishList());
    }
    dispatch({
      type: constant.DEL_WISH_LIST_RESET,
    });
  }, [succ]);

  const handleDelete = (id) => {
    dispatch(dispatches.deleteWishList({ id: id }));
    console.log("lls");
  };

  const addToCartHandler = (product) => {
    const cart = {
      productId: product._id._id,
      qty: 1,
      image: product._id.image,
      price: product._id.price,
      title: product._id.productName,
      numStock: product._id.numStock,
    };
    dispatch(cartDispatches.addToCart(cart, product._id._id));
    // dispatch(cartActions.addToCart(cart, id));
  };
  return (
    <Container>
      {loading && <Spiner />}
      {error && <Message>{error}</Message>}
      {wishList && (
        <>
          <h4>Wish List </h4>
          {wishList.length === 0 && <Message>Your Wish List Is Empty</Message>}
          {wishList.map((x) => (
            <Row className="bg-white py-3 my-2 border rounded" key={x._id._id}>
              <Col md={2}>
                <Image
                  src={x._id.image}
                  alt={x._id.productName}
                  fluid
                  style={{
                    height: "120px",
                  }}
                />
              </Col>
              <Col md={10}>
                <Row>
                  <Col md={9}>
                    <Link to={`/product/${x._id._id}`}>
                      <strong>
                        <p>{x._id.productName}</p>
                      </strong>
                    </Link>
                    <i
                      className="fa fa-star ml-1"
                      aria-hidden="true"
                      style={{
                        color: "#FBB600",
                      }}
                    ></i>
                    {x._id.ratings}
                    <span
                      className="ml-1"
                      style={{
                        color: "#BFD8FF",
                      }}
                    >
                      ({x._id.numReviews})
                    </span>
                    <div className="mt-1">
                      <strong>
                        {" "}
                        {x._id.numStock === 0
                          ? "Out Of Stock"
                          : "In Stock"}{" "}
                      </strong>
                    </div>
                  </Col>
                  <Col md={3}>
                    <h5>R {x._id.price}</h5>
                    <Button
                      onClick={() => {
                        addToCartHandler(x);
                      }}
                      type="button"
                      className="btn-block"
                      variant="success"
                    >
                      <i className="fa fa-cart-plus" aria-hidden="true"></i>
                      {""} Add To Cart
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(x._id._id);
                      }}
                      type="button"
                      className="btn-block"
                      variant="primary"
                    >
                      {delLoader ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        <>
                          <i className="fas fa-trash  text-danger  "></i>{" "}
                          <span> Remove From List </span>
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </>
      )}
    </Container>
  );
};

export default WishList;
