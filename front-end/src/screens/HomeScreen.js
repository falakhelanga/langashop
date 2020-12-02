import React, { useEffect } from "react";
import "./homescreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import query from "query-string";
import * as dispatchProducts from "../store/actions/productActions";
import Products from "../components/Product";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import Cauroserl from "./Cauroserl";
import Paginate from "../components/Paginate";
import Aos from "aos";
import "aos/dist/aos.css";

const HomeScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.fetchProducts);
  const { keyword, page } = useParams();
  const productName = query.parse(location.search).productName;

  const { productList, loading, error, page: pagee, pages } = productsState;

  useEffect(() => {
    Aos.init({ duration: 1000 });
    dispatch(dispatchProducts.fetchProducts(productName, page));
  }, [dispatch, productName, page]);

  return (
    <Container
      fluid
      style={{
        width: "100%",
      }}
    >
      {!keyword && <Cauroserl />}
      {keyword && (
        <Button
          variant="light"
          onClick={() => {
            history.goBack();
          }}
        >
          Go Back
        </Button>
      )}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <h3 className="mt-5 text-center">Latest Laptops</h3>
          {productList && (
            <Container className="d-flex  flex-wrap">
              {/* <Row> */}
              {productList.map((product) => (
                // <Col
                //   data-aos="fade-up"
                //   data-aos-once="true"
                //   sm={12}
                //   md={6}
                //   lg={4}
                //   xl={3}
                //   key={product._id}
                // >
                <Products
                  data-aos="fade-up"
                  data-aos-once="true"
                  key={product._id}
                  image={product.image}
                  title={product.productName}
                  rating={product.ratings}
                  numReviews={product.numReviews}
                  price={product.price}
                  id={product._id}
                  discount={product.discountPrice}
                />
                // </Col>
              ))}
              {/* </Row> */}
            </Container>
          )}
        </>
      )}
      <div className=" mx-auto  justify-content-center d-flex mt-5">
        <Paginate page={pagee} pages={pages} keyword={productName} />
      </div>
    </Container>
  );
};

export default HomeScreen;
