import React, { useEffect, useState } from "react";
import * as shipmentActions from "../store/actions/shipmentActions";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";

const ShipmentScreen = ({ history }) => {
  const userState = useSelector((state) => state.userLogin);
  const shipmentState = useSelector((state) => state.addShipMent);
  const dispatch = useDispatch();
  const [adress, setAdress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { token } = userState;
  const { shipment } = shipmentState;

  const isAuth = token != null;
  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }
    if (shipment) {
      setAdress(shipment.adress);
      setCountry(shipment.country);
      setCity(shipment.city);
      setPostalCode(shipment.postalCode);
    }
  }, [isAuth, shipment, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const shipment = {
      adress,
      country,
      city,
      postalCode,
    };
    dispatch(shipmentActions.addShipment(shipment));
    history.push("/payment");
  };
  return (
    <Container
    // className="loginContainer"
    // style={{
    //   width: "50%",
    //   margin: " 55px auto",
    //   backgroundColor: "white",
    //   padding: "30px",
    // }}
    >
      <h4>Delivery Details</h4>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicAdress">
          <Form.Label> Address</Form.Label>
          <Form.Control
            value={adress}
            onChange={(e) => {
              setAdress(e.target.value);
            }}
            type="text"
            placeholder="Enter Adress"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            type="text"
            placeholder="Enter Country"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            type="text"
            placeholder="Please enter City"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
            type="text"
            placeholder="Enter Postal Code"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ShipmentScreen;
