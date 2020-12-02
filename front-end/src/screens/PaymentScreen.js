import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import * as paymentActions from "../store/actions/paymentActions";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [paypal, setPaypal] = useState("");
  const paymentState = useSelector((state) => state.paymentReducer);
  const userState = useSelector((state) => state.userLogin);
  const { token } = userState;
  const { paymentMethod } = paymentState;
  const isAuth = token != null;

  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }

    if (paymentMethod) {
      setPaypal(paymentMethod);
    }
  }, [paymentMethod, isAuth, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(paymentActions.paymentMethod(paypal));
    history.push("/checkout");
  };

  return (
    <Container
      className="py-10 bg-white border rounded"
      style={{
        marginTop: "20px",
        height: "30vh",
        width: "80%",
        padding: "20px",
      }}
    >
      <h3>How would you Like To Pay</h3>
      <Row>
        <Col sm={12} className="bg-white rounded">
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="PayPal Method"
                value="paypal"
                onChange={(e) => {
                  setPaypal(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentScreen;
