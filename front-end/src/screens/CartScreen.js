import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Image,
  FormControl,
  Card,
  ListGroup,
  ListGroupItem,
  Container,
} from "react-bootstrap";
import Message from "../components/Message";
import * as cartActions from "../store/actions/cartActions";
import Rating from "../components/Ratings";
import "./cart.css";

const CartScreen = ({ history }) => {
  const cartState = useSelector((state) => state.addToCart);
  const userState = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { cart } = cartState;
  const { token } = userState;

  const isAuth = token != null;

  const redirect = isAuth ? "/shipment" : "/signin/?q=/shipment";

  // const [qty, setQty] = useState(0);
  return (
    <>
      <Container className="py-5">
        <h5
          style={{
            fontWeight: "bold",
          }}
        >
          My Shopping Shopping Cart
        </h5>
        {cart.length === 0 ? (
          <Message>
            <h3> Cart Is Empty</h3>
          </Message>
        ) : (
          <Row>
            <Col md={8} className=" p-1 ">
              {cart.map((product) => (
                <Container>
                  <Row
                    key={product.productId}
                    className="border rounded my-1 py-2 bg-white"
                    style={{
                      position: "relative",
                    }}
                  >
                    {" "}
                    <span
                      onClick={() => {
                        dispatch(cartActions.removeToCart(product.productId));
                        console.log("hhh");
                      }}
                      className="fa fa-trash text-danger d-block d-md-none cart_trash"
                      aria-hidden="true"
                      style={{
                        cursor: "pointer",
                      }}
                    ></span>
                    <Col md={3} className="text-center">
                      <Image
                        src={product.image}
                        alt={product.productName}
                        fluid
                        className="cart_image text-center"
                      />
                    </Col>
                    <Col md={4} className="mt-3">
                      <Link to={`/product/${product.productId}`}>
                        {product.title}
                      </Link>
                    </Col>
                    <Col md={4}>
                      <ListGroup variant="flush">
                        <ListGroupItem>
                          <h3>R {product.price}</h3>
                          <Rating value={product.rating} />{" "}
                          <span>
                            {product.numReviews}{" "}
                            <Link
                              to={`/product/${product.productId}/reviews`}
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              Reviews
                            </Link>
                          </span>
                          <Row className="mt-2">
                            <Col>
                              <FormControl
                                value={product.qty}
                                as="select"
                                onChange={(e) => {
                                  dispatch(
                                    cartActions.addToCart(
                                      {
                                        ...product,
                                        qty: Number(e.target.value),
                                      },
                                      product.productId
                                    )
                                  );
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
                        </ListGroupItem>
                      </ListGroup>
                    </Col>
                    <Col className="d-none d-md-block">
                      <span
                        onClick={() => {
                          dispatch(cartActions.removeToCart(product.productId));
                        }}
                        className="fa fa-trash text-danger"
                        aria-hidden="true"
                        style={{
                          cursor: "pointer",
                        }}
                      ></span>
                    </Col>
                  </Row>
                </Container>
              ))}
            </Col>
            <Col md={4}>
              <Card className=" mt-2  p-3 bg-white text-center">
                <ListGroupItem>
                  <h4>Cart Summary</h4>
                </ListGroupItem>
                <ListGroupItem>
                  <Row className="mt-3">
                    <Col>TOTAL:({cart.length} items)</Col>
                    <Col>
                      <h2 className="text-success">
                        R
                        {cart.reduce(
                          (acc, cur) => acc + Number(cur.price * cur.qty),
                          0
                        )}
                      </h2>
                    </Col>
                  </Row>
                  <Button
                    type="button"
                    variant="success"
                    className="btn-block btn-primary mt-3"
                    onClick={() => {
                      console.log(redirect);
                      history.push(redirect);
                    }}
                  >
                    Proceed To check Out
                  </Button>
                </ListGroupItem>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default CartScreen;
