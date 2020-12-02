import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as orderAction from "../store/actions/orderActions";
import {
  Row,
  Col,
  Button,
  Image,
  Card,
  ListGroup,
  ListGroupItem,
  Container,
} from "react-bootstrap";

const CheckOutScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.addToCart);
  const shipmentState = useSelector((state) => state.addShipMent);
  const paymentState = useSelector((state) => state.paymentReducer);
  const userState = useSelector((state) => state.userLogin);
  const orderState = useSelector((state) => state.addOrder);

  const { cart } = cartState;
  const { success, orderId } = orderState;
  const { shipment } = shipmentState;
  const { paymentMethod } = paymentState;
  const { token, user } = userState;
  const isAuth = token != null;
  const DELIVERY_PRICE = 100;

  const TAX_PRICE = (
    cart.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.qty), 0) *
    0.15
  ).toFixed(2);
  const ITEMS_PRICE = cart
    .reduce((acc, curr) => acc + Number(curr.price) * Number(curr.qty), 0)
    .toFixed(2);
  const TOTAL_ITEMS = cart.reduce((acc, curr) => acc + Number(curr.qty), 0);
  const TOTAL_PRICE = (
    cart.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.qty), 0) +
    DELIVERY_PRICE +
    cart.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.qty), 0) *
      0.15
  ).toFixed(2);
  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }
    if (success) {
      history.push(`/orders/${orderId}`);
    }
  }, [history, isAuth, success]);

  const orders = cart.map((item) => {
    return {
      name: item.title,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item.productId,
    };
  });

  const orderDetails = {
    orderItems: orders,
    shippingAdress: shipment,
    paymentMethod,
    taxPrice: TAX_PRICE,
    shippingPrice: DELIVERY_PRICE,
    totalPrice: TOTAL_PRICE,
  };

  const orderHandler = () => {
    dispatch(orderAction.addOrder(orderDetails));
  };
  return (
    <>
      <Container className="py-5">
        <h4
          style={{
            fontWeight: "bold",
          }}
        >
          Confirm and Pay
        </h4>
        <Row>
          <Col md={8}>
            <Row className="bg-white border rounded py-3">
              <Container>
                <h5>Delivery Details</h5>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>
                        <strong>Email:</strong>
                      </Col>
                      <Col>
                        <strong>{user.email}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Adress:</strong>
                      </Col>
                      <Col>
                        <strong>{shipment.adress}</strong>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <strong>City:</strong>
                      </Col>
                      <Col>
                        <strong>{shipment.city}</strong>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <strong>Country:</strong>
                      </Col>
                      <Col>
                        <strong>{shipment.country}</strong>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <strong>Postal Code:</strong>
                      </Col>
                      <Col>
                        <strong>{shipment.postalCode}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Container>
            </Row>

            <Row className="bg-white border rounded py-3 mt-2">
              <Container>
                <h5>Payment Method</h5>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>
                        <strong>method:</strong>
                      </Col>
                      <Col>
                        <strong>{paymentMethod}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Container>
            </Row>

            <Row className="bg-white border rounded py-3 mt-2">
              <Container>
                <h5>Orders</h5>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    {cart.map((product, index) => (
                      <Row
                        key={product.productId}
                        className="my-2 border rounded py-2"
                      >
                        <Col md={3}>
                          <Image
                            src={product.image}
                            alt={product.title}
                            fluid
                          />
                        </Col>
                        <Col md={6}>
                          <Link to={`/product/${product.productId}`}>
                            {product.title}
                          </Link>
                        </Col>
                        <Col md={3}>
                          <Row>
                            <Col>
                              <strong>Price:</strong>
                            </Col>
                            <Col>
                              <h5>R{product.price}</h5>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col>
                              <strong>Qty:</strong>
                            </Col>
                            <Col>
                              <h5>{product.qty}</h5>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))}
                  </ListGroupItem>
                </ListGroup>
              </Container>
            </Row>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroupItem>
                  <h5>ORDER SUMMURY</h5>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      {TOTAL_ITEMS} {""}
                      {cart.reduce((acc, curr) => acc + Number(curr.qty), 0) ===
                      1
                        ? "Item"
                        : "Items"}
                    </Col>
                    <Col>R {ITEMS_PRICE}</Col>
                  </Row>
                  <Row>
                    <Col>Delivery </Col>
                    <Col>
                      {cart.reduce(
                        (acc, curr) =>
                          acc + Number(curr.price) * Number(curr.qty),
                        0
                      ) >= 400
                        ? `R ${DELIVERY_PRICE}`
                        : "FREE"}
                    </Col>
                  </Row>

                  <Row>
                    <Col>Tax Price </Col>
                    <Col>R {TAX_PRICE}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <h5>
                        <strong>TO PAY:</strong>
                      </h5>
                    </Col>

                    <Col>
                      <h5 className="text-success font-weight-bold">
                        R {TOTAL_PRICE}
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        onClick={() => {
                          orderHandler();
                        }}
                        className="btn-block btn-success mt-2"
                        type="button"
                      >
                        Place The Order
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CheckOutScreen;
