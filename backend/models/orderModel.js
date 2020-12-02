import mongoose from "mongoose";

const schema = mongoose.Schema;

const OrdersSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, default: 0 },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: schema.Types.ObjectId,
          required: true,
          ref: "Products",
        },
      },
    ],
    shippingAdress: {
      adress: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_adress: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDeliverd: {
      type: Boolean,
      required: true,
      default: false,
    },
    delieveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrdersSchema);

export default Orders;
