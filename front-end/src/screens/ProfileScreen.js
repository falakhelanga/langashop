import React from "react";
import { useEffect, useState } from "react";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { getProfile, profileUpdate } from "../store/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import * as constant from "../store/actionContants/userConstants";
import * as orderConstants from "../store/actionContants/orderAction";
import * as orderActions from "../store/actions/orderActions";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userLogin);
  const profileState = useSelector((state) => state.getProfile);
  const profileUpdateState = useSelector((state) => state.profileUpdate);
  const orderState = useSelector((state) => state.getOrder);

  const { orders } = orderState;

  const { updateSuccess, load, error: updateError } = profileUpdateState;

  const { token } = userState;
  const { profile, profileReady } = profileState;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [suc, setSuc] = useState(false);

  const isAuth = token != null;
  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }
    if (updateSuccess) {
      setSuc(true);
    }

    if (!profileReady || updateSuccess) {
      dispatch(getProfile());
      dispatch(orderActions.getOrder());
    } else {
      setEmail(profile.email);
      setName(profile.name);
    }
  }, [
    history,
    dispatch,
    token,
    profile,

    isAuth,
    profileReady,
    orders,
    updateSuccess,
  ]);

  useEffect(() => {
    const reseting = () => {
      if (updateSuccess) {
        setTimeout(() => {
          dispatch({
            type: constant.USER_PROFILE_UPDATE_RESET,
          });
          setSuc(false);
        }, 10000);
      }
    };

    const removeTime = () => {
      clearTimeout();
    };
    reseting();
    return removeTime();
  }, [dispatch, updateSuccess]);

  useEffect(() => {
    dispatch({
      type: constant.USER_PROFILE_RESET,
    });
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      profileUpdate({
        name,
        email,
        password,
      })
    );
  };
  return (
    <>
      <Row className="mx-2">
        <Col md={3} className=" border rounded bg-white py-2">
          <h4>Profile</h4>
          {load ? <Spinner /> : updateError && <Message>{updateError}</Message>}
          {suc && <Message variant="success">profile updated</Message>}
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

            <Form.Group controlId="formBasicConfirmPassword">
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
              Update
            </Button>
          </Form>
        </Col>
        <Col md={8} className="bg-white ml-2 bordered rounded py-2 ">
          <h4>My Orders</h4>
          <Row>
            <Col>
              <Table bordered responsive hover striped className="table-sm">
                <thead>
                  <tr>
                    <th>Order Id</th>

                    <th>Total</th>
                    <th>Delivered</th>
                    <th>Paid</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>R {order.totalPrice}</td>
                        <td>
                          {order.isDeliverd
                            ? `Delivered On ${order.delieveredAt} `
                            : "No"}
                        </td>
                        <td>
                          {order.paidAt
                            ? `Delivered At ${order.paidAt} `
                            : "No"}
                        </td>
                        <td>
                          <Button
                            variant="light"
                            type="button"
                            onClick={() => {
                              history.push(`/orders/${order._id}`);
                            }}
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
