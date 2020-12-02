import Order from "../../models/orderModel.js";
import asyncHandler from "express-async-handler";

export const addOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAdress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAdress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const orderCreated = await order.save();

  res.status(201);
  res.json(orderCreated);
});

export const getOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  if (!order) {
    res.status(404);
    throw new Error("No Orders");
  }

  res.json(order);
});

export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order Not Found");
  }

  res.json(order);
});

export const orderPay = asyncHandler(async (req, res, next) => {
  const { paymentResult } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order Not Found");
  }

  order.paymentResult = paymentResult;
  order.isPaid = true;
  order.paidAt = Date.now();
  const updatedOrder = await order.save();

  res.status(201).json(updatedOrder);
});
