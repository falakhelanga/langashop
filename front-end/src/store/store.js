import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  fetchProducts,
  fetchProduct,
  fetchDiscount,
} from "./reducers/productsReduders";
import { addToCart } from "./reducers/cartReducers";
import { userLogin, userRegister } from "./reducers/userReducers";
import { addShipMent } from "./reducers/shipmentReducer";
import { paymentReducer } from "./reducers/payMentReducers";
import {
  addOrder,
  getOrder,
  getSingleOrder,
  orderPay,
} from "./reducers/orderReducer";
import {
  getOrders,
  orderDeliver,
} from "./reducers/adminReducers/ordersReducer";
import { getProfile, profileUpdate } from "./reducers/profileReducers";
import {
  getUsersReducer,
  deleteUser,
  getUserReducer,
  UpdateUserReducer,
} from "./reducers/adminReducers/usersReducer";
import {
  getAdminProducts,
  deleteProduct,
  createAdminProducts,
} from "./reducers/adminReducers/productReducer";
import { uploadReducer } from "./reducers/uploadReducer";
import {
  addToWishList,
  getWishLists,
  deleteToWishList,
} from "./reducers/wishListReducer";
import { getReviews, addReviews } from "./reducers/reviewsReducer";

const reducers = combineReducers({
  fetchProducts,
  fetchProduct,
  addToCart,
  userLogin,
  userRegister,
  addShipMent,
  paymentReducer,
  addOrder,
  getProfile,
  profileUpdate,
  getOrder,
  getSingleOrder,
  orderPay,
  getUsersReducer,
  deleteUser,
  getUserReducer,
  UpdateUserReducer,
  getOrders,
  orderDeliver,
  getAdminProducts,
  deleteProduct,
  uploadReducer,
  createAdminProducts,
  fetchDiscount,
  addToWishList,
  getWishLists,
  deleteToWishList,
  getReviews,
  addReviews,
});

const localProducts = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : null;
const localPayment = localStorage.getItem("payment")
  ? JSON.parse(localStorage.getItem("payment"))
  : null;
const localShipment = localStorage.getItem("shipment")
  ? JSON.parse(localStorage.getItem("shipment"))
  : {};
const localUserLogin = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};
const localUserToken = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
const localAdmin = localStorage.getItem("admin")
  ? JSON.parse(localStorage.getItem("admin"))
  : false;

const localCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  fetchProducts: {
    productList: localProducts,
  },
  addToCart: {
    cart: localCart,
  },
  userLogin: {
    user: localUserLogin,
    token: localUserToken,
    isAdmin: localAdmin,
  },
  paymentReducer: {
    paymentMethod: localPayment,
  },
  addShipMent: {
    shipment: localShipment,
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
