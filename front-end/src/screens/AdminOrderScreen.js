import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ordersActions from "../store/actions/adminActions/orders";
import { Container, Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Spiner from "../components/Spinner";

const AdminOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.getOrders);
  const token = useSelector((state) => state.userLogin.token);

  const isAuth = token != null;

  const { orders, loading, error } = orderState;

  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }

    dispatch(ordersActions.getOrders());
  }, [isAuth, dispatch, history]);
  return (
    <div className="mx-5">
      <h3>Orders</h3>
      {loading && <Spiner />}
      {error && <Message>{error}</Message>}
      {orders && (
        <Table bordered striped responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>

              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>R {order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid
                    ? `Paid at ${new Date(order.paidAt).toDateString()}`
                    : "No"}
                </td>
                <td>
                  {order.isDeliverd
                    ? `Deleivered on ${new Date(
                        order.delieveredAt
                      ).toDateString()}`
                    : "No"}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
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
      )}
    </div>
  );
};

export default AdminOrderScreen;
