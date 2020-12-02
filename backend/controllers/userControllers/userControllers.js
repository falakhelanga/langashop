import User from "../../models/userModel.js";
import bycrpt from "bcryptjs";
import asyncHandler from "express-async-handler";
import tokenGenerator from "../../utils/tokenGenerator.js";
import pkg from "google-auth-library";

const { OAuth2Client } = pkg;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("this user does not exist");
  }

  const checkedPassword = await bycrpt.compare(password, user.password);

  if (!checkedPassword) {
    res.status(404);
    throw new Error("you have entered an invalid password");
  }

  res.json({
    name: user.name,
    email: user.email,
    token: tokenGenerator(user._id),
    isAdmin: user.isAdmin,
    wishList: user.wishlist,
  });
});

export const userRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(401);
    throw new Error("this email is already exist please try another one");
  }
  const hashedPassword = await bycrpt.hash(password, 12);
  const userS = new User({
    name,
    email,
    password: hashedPassword,
  });

  const userSaving = await userS.save();

  res.json({
    name: userSaving.name,
    email: userSaving.email,
    isAdmin: userSaving.isAdmin,
    token: tokenGenerator(userSaving._id),
  });
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error(" user not found");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser && existUser.email != req.user.email) {
    res.status(400);
    throw new Error("this email already exist");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  user.name = req.body.name ? req.body.name : user.name;
  user.email = req.body.email ? req.body.email : user.email;
  user.password = req.body.password ? req.body.password : user.password;

  const updatedUser = await user.save();

  res.status(201).json({
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

export const postwishList = asyncHandler(async (req, res, next) => {
  const { favorate } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("this user does not exist");
  }

  let wish = null;

  if (user) {
    wish = user.wishlist.find((x) => x._id.toString() === favorate.toString());
  }

  if (wish) {
    const index = user.wishlist.indexOf(wish);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    }
  } else {
    user.wishlist.push(favorate);
  }

  // user.wishlist = updatedUser;

  const updatedWishList = await user.save();

  res.json(updatedWishList.wishlist);
  // res.status(201).json({
  //   message: "this product has added successfuly",
  // });
});

export const getWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist._id",
    model: "Product",
  });
  if (!user) {
    res.status(404);
    throw new Error("this user does not exist");
  }

  res.json(user.wishlist);
});

export const deleteWish = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("this user does not exist");
  }

  let wish = null;

  if (user) {
    wish = user.wishlist.find((x) => x._id.toString() === id.toString());
  }

  if (wish) {
    const index = user.wishlist.indexOf(wish);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    }
  }
  const updatedUser = await user.save();
  res.json(updatedUser);
});

export const googleAuth = asyncHandler(async (req, res, next) => {
  const { tokenId } = req.body;
  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email_verified, name, email } = response.payload;
  if (email_verified) {
    const user = await User.findOne({ email });

    if (!user) {
      const userS = new User({
        name,
        email,
        password: "12334e4f",
      });

      const userSaving = await userS.save();
      return res.json({
        name: userSaving.name,
        email: userSaving.email,
        isAdmin: userSaving.isAdmin,
        token: tokenGenerator(userSaving._id),
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      token: tokenGenerator(user._id),
      isAdmin: user.isAdmin,
      wishList: user.wishlist,
    });
  }

  console.log(response);
});
