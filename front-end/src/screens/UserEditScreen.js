import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import Message from "../components/Message";
import Spinner from "../components/Spinner";
import * as editActions from "../store/actions/adminActions/users";
import * as constants from "../store/actionContants/adminContants/usersConstants";

const UserEditScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userLogin);
  const EdituserState = useSelector((state) => state.getUserReducer);
  const EditUpdateState = useSelector((state) => state.UpdateUserReducer);

  const { user, loading, error } = EdituserState;
  const {
    updateSucc,
    loading: updateLoading,
    error: updateError,
  } = EditUpdateState;

  const { token } = userState;

  const isAuth = token != null;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }

    if (updateSucc) {
      dispatch({
        type: constants.USER_EDIT_RESET,
      });
      history.push("/admin/users");
    }
    if (user == null) {
      dispatch(editActions.getUser(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [history, isAuth, user, dispatch, id, updateSucc]);

  useEffect(() => {
    dispatch({
      type: constants.GET_USER_RESET,
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      email,
      isAdmin,
      name,
    };

    dispatch(editActions.editUser(id, user));
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
      <h4>Update User</h4>
      {loading || updateLoading ? (
        <Spinner />
      ) : (
        error || (updateError && <Message>{error}</Message>)
      )}
      {user && (
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
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => {
                setIsAdmin(e.target.checked);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UserEditScreen;
