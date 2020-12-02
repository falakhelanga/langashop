import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import { PayPalButton } from "react-paypal-button-v2";
import * as orderAction from "../store/actions/orderActions";
import * as constants from "../store/actionContants/orderAction";
import * as adConst from "../store/actionContants/adminContants/ordersContants";
import * as adminOrderAction from "../store/actions/adminActions/orders";
import {
  Row,
  Col,
  Button,
  Image,
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

const OrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.getSingleOrder);
  const userState = useSelector((state) => state.userLogin);
  const orderPayState = useSelector((state) => state.orderPay);
  const adminOrderState = useSelector((state) => state.orderDeliver);
  const [sdk, setSdk] = useState(false);

  const { order, loading, error } = orderState;

  const { token, user } = userState;
  const { paySuccess } = orderPayState;
  const { Succ, loading: adminLoader, error: adminError } = adminOrderState;
  const isAuth = token != null;

  const { id } = useParams();
  const payPalHandler = (details, data) => {
    const paymentResult = {
      id: details.id,
      status: details.status,
      update_time: details.update_time,
      email_adress: details.payer.email_adress,
    };
    dispatch(orderAction.orderPay(paymentResult, id));

    console.log(details);
  };
  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }

    const scriptCreator = async () => {
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const { data: CLIENT_ID } = await axios.get(
        "http://localhost:500/api/clientId",
        config
      );

      const script = document.createElement("script");
      script.type = "text/javscript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`;
      script.async = true;
      script.onload = () => {
        setSdk(true);
      };
      document.body.appendChild(script);
    };

    if (order === null || paySuccess) {
      dispatch(orderAction.getSingleOrder(id));
      dispatch({
        type: constants.ORDER_PAY_RESET,
      });
      dispatch({
        type: constants.GET_SINGLE_ORDER_RESET,
      });
    } else if (!order.isPaid) {
      if (!window.paypal) {
        scriptCreator();
      } else {
        setSdk(true);
      }
    }
    console.log(sdk);
  }, [history, isAuth, order, dispatch, id, paySuccess, sdk, token]);

  useEffect(() => {
    dispatch({ type: adConst.ORDER_DELIVERED_RESET });
    dispatch({
      type: constants.GET_SINGLE_ORDER_RESET,
    });
  }, []);

  useEffect(() => {
    if (Succ) {
      history.push("/admin/orders");
    }
  }, [Succ, history]);

  const deliverHandler = () => {
    dispatch(adminOrderAction.orderDeliver(id));
  };
  return (
    <>
      {" "}
      {order && (
        <Container className="py-5">
          <h4
            style={{
              fontWeight: "bold",
            }}
          >
            {order && `order ${order._id}`}
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
                          <strong>{order.user.email}</strong>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <strong>Adress:</strong>
                        </Col>
                        <Col>
                          <strong>{order.shippingAdress.adress}</strong>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <strong>City:</strong>
                        </Col>
                        <Col>
                          <strong>{order.shippingAdress.city}</strong>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <strong>Country:</strong>
                        </Col>
                        <Col>
                          <strong>{order.shippingAdress.country}</strong>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <strong>Postal Code:</strong>
                        </Col>
                        <Col>
                          <strong>{order.shippingAdress.postalCode}</strong>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col>
                          {order.isDeliverd ? (
                            <Message variant="success">
                              Delivered at {order.delieveredAt}{" "}
                            </Message>
                          ) : (
                            <Message>The Order Has Not Delivered</Message>
                          )}
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
                          <strong>{order.paymentMethod}</strong>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col>
                          {order.isPaid ? (
                            <Message variant="success">
                              Paid on {new Date(order.paidAt).toDateString()}{" "}
                            </Message>
                          ) : (
                            <Message>The Order Has Not Paid</Message>
                          )}
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
                      {order.orderItems.map((product, index) => (
                        <Row key={index} className="my-2 border rounded py-2">
                          <Col md={3}>
                            <Image
                              src={product.image}
                              alt={product.title}
                              fluid
                            />
                          </Col>
                          <Col md={6}>
                            <Link to={`/product/${product.product}/?cart=true`}>
                              {product.name}
                            </Link>
                          </Col>
                          <Col md={3}>
                            {product.qty} * {product.price} ={" "}
                            <span
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              R
                              {order.orderItems.reduce(
                                (acc, curr) =>
                                  acc + Number(curr.price) * Number(curr.qty),
                                0
                              )}
                            </span>
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
                        {order.orderItems.reduce(
                          (acc, curr) => acc + Number(curr.qty),
                          0
                        )}{" "}
                        {""}
                        {order.orderItems.reduce(
                          (acc, curr) => acc + Number(curr.qty),
                          0
                        ) === 1
                          ? "Item"
                          : "Items"}
                      </Col>
                      <Col>
                        R{" "}
                        {order.orderItems
                          .reduce(
                            (acc, curr) =>
                              acc + Number(curr.price) * Number(curr.qty),
                            0
                          )
                          .toFixed(2)}
                      </Col>
                    </Row>
                    <Row>
                      <Col>Delivery </Col>
                      <Col>
                        {order.orderItems.reduce(
                          (acc, curr) =>
                            acc + Number(curr.price) * Number(curr.qty),
                          0
                        ) >= 400
                          ? `R ${order.shippingPrice}`
                          : "FREE"}
                      </Col>
                    </Row>

                    <Row>
                      <Col>Tax Price </Col>
                      <Col>R {order.taxPrice}</Col>
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
                          R {order.totalPrice.toFixed(2)}
                        </h5>
                      </Col>
                    </Row>
                    {user.isAdmin && !order.isDeliverd ? (
                      <Row className="mt-2">
                        <Col>
                          <Button
                            className="btn-block"
                            onClick={() => {
                              deliverHandler();
                              console.log("tttt");
                            }}
                          >
                            {adminLoader ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              "Mark As Delivered"
                            )}
                          </Button>
                        </Col>
                      </Row>
                    ) : (
                      !order.isPaid && (
                        <Row className="mt-2">
                          <Col>
                            <PayPalButton
                              amount={order.totalPrice}
                              onSuccess={(details, data) => {
                                payPalHandler(details, data);
                              }}
                            />
                          </Col>
                        </Row>
                      )
                    )}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default OrderScreen;
