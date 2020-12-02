import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/productActions";
import { fetchDiscount } from "../store/reducers/productsReduders";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
const Cauroserl = () => {
  const dispatch = useDispatch();
  const discountState = useSelector((state) => state.fetchDiscount);

  useEffect(() => {
    dispatch(actions.fetchDiscount());
  }, [dispatch]);

  const { productList, loading, error } = discountState;
  return loading ? (
    <Spinner />
  ) : error ? (
    <Message>error</Message>
  ) : productList ? (
    <Carousel pause="hover" className=" mb-2">
      {productList.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={`http://localhost:500${product.image}`}
              alt={product.productName}
              fluid
            />
          </Link>
          <Link to={`/product/${product._id}`}>
            <Carousel.Caption className="carousel-caption">
              <h1>{product.discountPrice}% OFF</h1>
              <h3>{product.productName}</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : null;
};

export default Cauroserl;
