import Orders from "../../models/orderModel.js";
import asynchandler from "express-async-handler";

export const getOrders = asynchandler(async (req, res, next) => {
  const orders = await Orders.find().sort({ createdAt: -1 }).populate("user");

  if (!orders) {
    res.status(404);
    throw new Error("Orders Not Found");
  }

  res.json(orders);
});

export const orderDeliverd = asynchandler(async (req, res, next) => {
  const order = await Orders.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order Not Found");
  }

  order.isDeliverd = true;
  order.delieveredAt = Date.now();

  const del = await order.save();
  res.json({
    message: "deliverd",
  });
});
