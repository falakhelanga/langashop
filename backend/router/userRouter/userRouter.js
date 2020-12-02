import * as userControllers from "../../controllers/userControllers/userControllers.js";
import Auth from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.route("/login").post(userControllers.userLogin);
router.route("/").post(userControllers.userRegister);
router.route("/profile").get(Auth, userControllers.getUserProfile);
router.route("/profile").put(Auth, userControllers.updateUserProfile);
router
  .route("/wishlist")
  .post(Auth, userControllers.postwishList)
  .get(Auth, userControllers.getWishList);

router.post("/wishlistdel", Auth, userControllers.deleteWish);
router.post("/login/google", userControllers.googleAuth);

export default router;
