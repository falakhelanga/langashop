import express from "express";
import Auth from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/authMiddleware.js";
import * as controllers from "../../controllers/adminControllers/product.js";

const router = express.Router();

router
  .route("/")
  .get(Auth, isAdmin, controllers.getProducts)
  .post(Auth, isAdmin, controllers.createProduct);
router.route("/:id").delete(Auth, isAdmin, controllers.deleteProduct);

export default router;
