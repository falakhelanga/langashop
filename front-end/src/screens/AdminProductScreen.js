import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productsActions from "../store/actions/adminActions/products";
import { Table, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Spiner from "../components/Spinner";

const AdminProductsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.getAdminProducts);
  const deleteState = useSelector((state) => state.deleteProduct);
  const token = useSelector((state) => state.userLogin.token);

  const isAuth = token != null;

  const { products, loading, error } = productsState;

  const { successDelete } = deleteState;

  useEffect(() => {
    if (!isAuth) {
      history.push("/signin");
    }

    dispatch(productsActions.getProducts());
  }, [isAuth, dispatch, history]);
  const deleteHandler = (id) => {
    if (window.confirm("are you sure you want to delete this user")) {
      dispatch(productsActions.deleteProduct(id));
    }
  };

  useEffect(() => {
    if (successDelete) {
      dispatch(productsActions.getProducts());
    }
  }, [successDelete, dispatch]);
  return (
    <div className="mx-2">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>Products</h3>
        <Button
          type="button"
          className="mb-2"
          onClick={() => {
            history.push("/admin/create/product");
          }}
        >
          Create product <i className="fas fa-plus  ml-2  "></i>
        </Button>
      </div>

      {loading && <Spiner />}
      {error && <Message>{error}</Message>}
      {products && (
        <Table bordered striped responsive hover className="teble-sm">
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>PRODUCT NAME</th>

              <th>PRODUCT PRICE</th>
              <th>PRODUCT CATEGORY</th>
              <th>PRODUCT BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>R{product.price.toFixed(2)}</td>
                <td>{product.productInformation.categories}</td>
                <td>{product.brand}</td>
                <td>
                  <div
                    style={{
                      marginTop: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <LinkContainer
                        to={`/admin/product/edit/${product._id}`}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <i className="fas fa-user-edit  text-success   "></i>
                      </LinkContainer>
                    </span>

                    <span
                      onClick={() => {
                        deleteHandler(product._id);
                      }}
                      className="fas fa-trash   ml-5 text-danger"
                      style={{
                        cursor: "pointer",
                      }}
                    ></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminProductsScreen;
