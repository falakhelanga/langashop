import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "./mongoose/mongoose.js";
import shopProductsRouter from "./router/shopRouter/productsRouter.js";
import * as erroMiddleware from "./middlewares/errorMiddleWares.js";
import userRouter from "./router/userRouter/userRouter.js";
import ordersRouter from "./router/shopRouter/ordersRouter.js";
import Auth from "./middlewares/authMiddleware.js";
import adminUsersRouter from "./router/adminRouter/usersRouter.js";
import adminOrdersRouter from "./router/adminRouter/ordersRouter.js";
import adminProductsRouter from "./router/adminRouter/productsRouter.js";
import uploadRouter from "./router/imageUploader.js";
import path from "path";

const app = express();

dotenv.config();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
mongoose();

app.use("/api/products", shopProductsRouter);
app.use("/api/register", userRouter);
app.use("/api/admin/users", adminUsersRouter);
app.use("/api/admin/orders", adminOrdersRouter);
app.use("/api/orders", ordersRouter);

app.use("/api/upload", uploadRouter);
app.use("/api/admin/products", adminProductsRouter);
app.get("/api/clientId", Auth, (req, res, next) => {
  res.send(process.env.CLIENT_ID);
});
app.get("/api/googleClientId", (req, res, next) => {
  res.send(process.env.GOOGLE_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(erroMiddleware.routerNotFound);
app.use(erroMiddleware.errorController);

const port = process.env.PORT || 500;

app.listen(port, (err) => {
  if (!err) {
    console.log("connected");
  }
});
