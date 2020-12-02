import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password");
  if (!users) {
    res.status(404);
    throw new Error("users Not found");
  }

  res.json(users);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  await user.remove();
  res.json({
    message: "user deleted",
  });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export const editUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name ? req.body.name : user.name;
  user.email = req.body.email ? req.body.email : user.email;
  user.isAdmin = req.body.isAdmin;
  console.log(user.isAdmin);

  const updates = await user.save();
  res.json({
    message: "user updated",
  });
});
