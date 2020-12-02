import authMiddleWare from "../../middlewares/authMiddleware.js";
import * as orderControllers from "../../controllers/shopControllers/ordersControllers.js";
import express from "express";

const router = express.Router();

router.route("/").post(authMiddleWare, orderControllers.addOrder);
router.route("/").get(authMiddleWare, orderControllers.getOrders);
router.route("/pay/:id").post(authMiddleWare, orderControllers.orderPay);
router.route("/:id").get(authMiddleWare, orderControllers.getOrder);

export default router;
