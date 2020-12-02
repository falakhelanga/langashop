import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as adminUsersDispatch from "../store/actions/adminActions/users";
import Message from "../components/Message";
import Spinner from "../components/Spinner";

const AdminUserScreen = ({ history }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userLogin.token);
  const usersState = useSelector((state) => state.getUsersReducer);
  const deleteState = useSelector((state) => state.deleteUser);

  const { loading, error, users } = usersState;
  const { successDelete } = deleteState;

  const isAuth = token !== null;
  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }

    dispatch(adminUsersDispatch.getUsers());
  }, [dispatch, isAuth, history]);

  useEffect(() => {
    if (successDelete) {
      dispatch(adminUsersDispatch.getUsers());
    }
  }, [successDelete, dispatch]);
  const deleteHandler = (id) => {
    if (window.confirm("are you sure you want to delete this user")) {
      dispatch(adminUsersDispatch.deleteUser(id));
    }
  };
  return (
    <Container>
      <h3>Users</h3>
      {loading && <Spinner />}
      {successDelete && <Message variant="success">User Deleted</Message>}
      {error && <Message>{error}</Message>}
      {users && (
        <Table responsive bordered striped hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <LinkContainer
                    to={`/admin/user/edit/${user._id}`}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-user-edit  text-success   "></i>
                  </LinkContainer>

                  <i
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                    className="fas fa-trash   ml-5 text-danger"
                    style={{
                      cursor: "pointer",
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminUserScreen;
