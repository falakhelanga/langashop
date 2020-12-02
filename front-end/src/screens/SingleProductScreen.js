import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./singleProduct.css";
import { useParams, Link } from "react-router-dom";
import Ratings from "../components/Ratings";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Truncate from "react-truncate";
import SmallImages from "../components/DetailImages";
import BottomNav from "../components/BottomNav";

import {
  Col,
  Row,
  Image,
  Container,
  Card,
  ListGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import * as productDispatch from "../store/actions/productActions";
import * as cartActions from "../store/actions/cartActions";
import * as wishDispaches from "../store/actions/wishListAction";
import DetailsComp from "../components/DetailsComp";

const SingleProductScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.fetchProduct);
  const productsState = useSelector((state) => state.fetchProducts);
  const cartState = useSelector((state) => state.addToCart);
  const { loading, error, product } = productState;
  const { productList } = productsState;
  const { cart } = cartState;
  const { id } = useParams();

  const productFound = productList.find((item) => item._id === id);
  const imageFound = productFound.detailsImage;

  const [imagesrc, setImagesrc] = useState(imageFound[0]);
  const discount = product ? product.discountPrice : 0;

  const noCart = location.search;
  const [qty, setQty] = useState(1);
  // const BorderColor = borderColor ? borderColor : "border border-light";
  useEffect(() => {
    dispatch(productDispatch.fetchProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    const cart = {
      productId: id,
      qty: qty,
      image: product.image,
      price: product.price - product.price * (discount / 100),
      title: product.productName,
      numStock: product.numStock,
      rating: product.ratings,
      numReviews: product.numReviews,
    };
    dispatch(cartActions.addToCart(cart, id));
  };
  const addWishList = () => {
    dispatch(wishDispaches.addWishList({ favorate: id }));
  };
  return loading ? (
    <Spinner />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    product && (
      <>
        <Container fluid className="mx-auto singleContainer  ">
          {/* <Button
            type="button"
            variant="light"
            onClick={() => {
              history.goBack();
            }}
            style={{
              marginTop: "10px",
              cursor: "pointer",
            }}
            className="mb-2 ml-1 d-none d-md-block"
          >
            Go Back
          </Button> */}
          {/* <IconButton
            onClick={() => {
              history.goBack();
            }}
            style={{
              cursor: "pointer",
            }}
            // className="mb-2 ml-1 d-none d-md-block"
          > */}
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
          {/* </IconButton> */}

          <Row className="mx-auto">
            <Col
              className="bg-info mb-2 "
              md={8}
              // style={{
              //   height: "120px",
              // }}
            >
              <Row
                className=" bg-white py-2 "
                style={{
                  height: "100%",
                }}
              >
                <Col md={6} className=" py-10 ">
                  <Row>
                    <Col
                      md={3}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "50%",
                      }}
                    >
                      {product.detailsImage !== undefined &&
                        product.detailsImage.map((image, i) => (
                          <SmallImages
                            key={i}
                            setImagesrc={setImagesrc}
                            image={image}
                          />
                        ))}
                    </Col>
                    <Col
                      md={9}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={imagesrc}
                        alt={product.productName}
                        fluid
                        className="p-2 border rounded hover"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item as="h5">
                      {product.productName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Ratings
                        value={product.ratings}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item as="div" className="desc">
                      <Truncate lines={3} ellipsis="...">
                        {product.description}
                      </Truncate>
                    </ListGroup.Item>
                    <ListGroup.Item as="div">
                      <Row>
                        <Col>
                          <Link
                            to={`/product/${id}/info`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            Product Information
                          </Link>
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${id}/reviews`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            Reviews
                          </Link>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
            {!noCart && (
              <Col md={4} className="d-none d-md-block">
                <Card>
                  <ListGroup>
                    <ListGroup.Item>
                      <h3>R {product.price}</h3>
                      {discount !== 0 && (
                        <h6 className="discount_price ">
                          R {(product.price * (discount / 100)).toFixed(2)}
                        </h6>
                      )}
                      <Row>
                        <Col md={6} as="h5">
                          Qty:
                        </Col>
                        <Col md={6}>
                          <FormControl
                            value={qty}
                            as="select"
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {product.numStock !== 0 &&
                              [
                                ...Array(product.numStock),
                              ].map((option, index) => (
                                <option key={index}>{index + 1}</option>
                              ))}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        variant="success"
                        type="button"
                        className="btn-block"
                        onClick={() => {
                          addToCartHandler();
                        }}
                      >
                        <strong>
                          {" "}
                          <i className="fas fa-cart-plus"></i>
                          <span className="ml-2 font-weight-bold ">
                            Add to Cart{" "}
                          </span>
                        </strong>
                      </Button>

                      {cart.length !== 0 && (
                        <Button
                          variant="info"
                          type="button"
                          className="btn-block"
                          onClick={() => {
                            history.push("/cart");
                          }}
                        >
                          <strong>Go to Cart</strong>
                        </Button>
                      )}
                      <Button
                        variant="light"
                        type="button"
                        className="btn-block"
                        onClick={() => {
                          addWishList();
                        }}
                      >
                        <strong>
                          {" "}
                          <span className="text-danger">
                            {" "}
                            <FavoriteIcon />
                          </span>
                          <span className="ml-2 font-weight-bold ">
                            Add to Wish List{" "}
                          </span>
                        </strong>
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            )}
          </Row>
          <BottomNav addToCartHandler={addToCartHandler} id={id} />
        </Container>
        {/* <div className="fixed-bottom d-flex d-md-none ">
          <Button
            variant="success"
            type="button"
            className="btn-block mx-1"
            onClick={() => {
              addToCartHandler();
            }}
          >
            <strong>
              {" "}
              <i className="fas fa-cart-plus"></i>
              <span className="ml-2 font-weight-bold">Add to Cart </span>
            </strong>
          </Button>
          <Button
            variant="primary"
            type="button"
            className="btn-block mx-1"
            onClick={() => {
              addToCartHandler();
            }}
          >
            <strong>
              {" "}
              <i className="fas fa-cart-plus"></i>
              <span className="ml-2 font-weight-bold ">Add to Cart </span>
            </strong>
          </Button>
        </div> */}

        {/* <DetailsComp id={id} /> */}
      </>
    )
  );
};

export default SingleProductScreen;
