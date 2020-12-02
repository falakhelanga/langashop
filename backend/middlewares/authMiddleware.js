import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authMiddleWare = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];

  if (authorization && authorization.startsWith("bearer")) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("cant verify the token");
    }
  } else {
    res.status(401);
    throw new Error("you are not Authorized");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error("Not authenticated");
  }

  next();
});

export default authMiddleWare;
