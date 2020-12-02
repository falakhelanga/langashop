import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import * as userActions from "../store/actions/userActions";
import axios from "axios";
import Message from "../components/Message";
import * as loginConstants from "../store/actionContants/userConstants";
// import Spinner from "../components/Spinner";
import "./userLogin.css";
const UserLoginScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userLogin);
  const { token, loading, error } = userState;
  const isAuth = token != null;
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [googleId, setGoogleId] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuth) {
      history.push(redirect);
    }
  }, [history, redirect, isAuth]);

  useEffect(() => {
    const fetchGoogleId = async () => {
      const { data } = await axios.get(
        "http://localhost:500/api/googleClientId"
      );
      setGoogleId(data);
    };
    fetchGoogleId();
  }, []);

  const responseGoogleSucc = async (response) => {
    const { data } = await axios.post(
      "http://localhost:500/api/register/login/google",
      {
        tokenId: response.tokenId,
      }
    );
    dispatch({
      type: loginConstants.USER_LOGIN_SUCCESS,
      user: {
        name: data.name,
        email: data.email,
      },
      isAdmin: data.isAdmin,
      token: data.token,
    });
  };

  const responseGoogleFail = (response) => {
    console.log(response);
  };

  const submitHandler = (e) => {
    console.log("object");
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(userActions.userLogin(user));
  };

  return (
    <Container className="  loginContainer justify-content-center d-flex">
      <Container
        className="  p-3 rounded bg-white"
        style={
          {
            // width: "50%",
            // margin: " 55px auto",
            // backgroundColor: "white",
            // padding: "30px",
          }
        }
      >
        <h4>Log In</h4>
        {error && <Message>{error}</Message>}
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
          <div
            className="text-center mx-auto"
            style={{
              width: "200px",
            }}
          >
            <Button variant="primary" type="submit" className="btn-block">
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Log In"
              )}
            </Button>
          </div>

          <p className="mt-3">
            new to ProComputers?{" "}
            <Link
              to={
                location.search
                  ? `/register/${location.search.split("=")[1]}`
                  : "/register"
              }
            >
              Create Account
            </Link>
          </p>
        </Form>
        <hr></hr>
        <div className="w-100 text-center">
          {googleId && (
            <GoogleLogin
              theme="dark"
              clientId={googleId}
              buttonText="Login With Google"
              onSuccess={responseGoogleSucc}
              onFailure={responseGoogleFail}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </Container>
    </Container>
  );
};

export default UserLoginScreen;
