import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Button } from "react-bootstrap";
import * as userActions from "../store/actions/userActions";
import Message from "../components/Message";
import Spinner from "../components/Spinner";

const RegisterScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const registerState = useSelector((state) => state.userRegister);
  const userState = useSelector((state) => state.userLogin);

  const { token } = userState;
  const { loading, error, user } = registerState;
  const isAuth = token != null;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuth) {
      history.push(redirect);
    }
  }, [history, redirect, isAuth]);

  const submitHandler = (e) => {
    console.log("object");
    e.preventDefault();

    const user = {
      email,
      password,
      name,
    };

    dispatch(userActions.userRegister(user));
  };

  return (
    <div
      style={{
        width: "50%",
        margin: " 55px auto",
        backgroundColor: "white",
        padding: "30px",
      }}
    >
      <h4>Register</h4>
      {loading ? <Spinner /> : error && <Message>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter Name"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterScreen;
