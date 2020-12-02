import express from "express";
import Auth from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/authMiddleware.js";
import * as ordersController from "../../controllers/adminControllers/orders.js";

const router = express.Router();

router.route("/").get(Auth, isAdmin, ordersController.getOrders);
router.route("/:id").put(Auth, isAdmin, ordersController.orderDeliverd);

export default router;
