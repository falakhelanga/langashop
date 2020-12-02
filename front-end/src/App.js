import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import SingleProductScreen from "./screens/SingleProductScreen";
import CartScreen from "./screens/CartScreen";
import UserLoginScreen from "./screens/UserLoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShipmentScreen from "./screens/ShipmentScreen";
import PaymentScreen from "./screens/PaymentScreen";
import CheckOutScreen from "./screens/CheckOutScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import AdminUsersScreen from "./screens/AdminUserScreen";
import UserEdit from "./screens/UserEditScreen";
import AdminOrders from "./screens/AdminOrderScreen";
import PageNotFound from "./screens/Page404";
import AdminProductScreen from "./screens/AdminProductScreen";
import AdminCreateProductScreen from "./screens/AdminCreateProductScreen";
import WishList from "./screens/WishList";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ReviewScreen from "./screens/ReviewScreen";
import ProdInfoScreen from "./screens/ProdInfoScreen";
import AddReview from "./screens/AddReviewScreen";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />

        <main
          style={{
            marginTop: "80px",
            minHeight: "80vh",
          }}
        >
          <Switch>
            <Route path="/product/:id/reviews" component={ReviewScreen} />
            <Route path="/product/:id/addreview" component={AddReview} />
            <Route path="/product/:id/info" component={ProdInfoScreen} />
            <Route
              path="/product/:id/:nocart?"
              component={SingleProductScreen}
            />

            <Route path="/cart" component={CartScreen} />
            <Route path="/wishList" component={WishList} />
            <Route path="/signin/:id?" component={UserLoginScreen} />
            <Route path="/shipment" component={ShipmentScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/checkout" component={CheckOutScreen} />
            <Route path="/orders/:id/:stripered?" component={OrderScreen} />
            <Route path="/register/:id?" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/admin/users" component={AdminUsersScreen} />
            <Route path="/admin/user/edit/:id" component={UserEdit} />
            <Route path="/admin/orders" component={AdminOrders} />
            <Route path="/admin/products" component={AdminProductScreen} />
            <Route
              path="/admin/create/product"
              component={AdminCreateProductScreen}
            />

            <Route path="/" exact component={HomeScreen} />
            <Route path="/page/:page" exact component={HomeScreen} />
            <Route path="/:keyword" exact component={HomeScreen} />
            <Route path="/:keyword/:page" exact component={HomeScreen} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
