import asyncHandler from "express-async-handler";
import Product from "../../models/productModel.js";
import Products from "../../models/productModel.js";

export const getProducts = asyncHandler(async (req, res, next) => {
  const productname = req.query.productName;
  const page = Number(req.query.page) || 1;

  const ITEMS_PER_PAGE = 12;

  const keyWord = productname
    ? {
        productName: {
          $regex: productname,
          $options: "i",
        },
      }
    : {};
  const count = await Products.countDocuments({ ...keyWord });
  const products = await Products.find({ ...keyWord })
    .sort({
      createdAt: -1,
    })
    .limit(ITEMS_PER_PAGE)
    .skip(ITEMS_PER_PAGE * (page - 1));

  if (!products) {
    res.status(404);
    throw new Error("Product not Found");
  }

  res.json({ products, page, pages: Math.ceil(count / ITEMS_PER_PAGE) });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Products.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not Found");
  }

  res.json(product);
});
export const getDiscount = asyncHandler(async (req, res, next) => {
  const product = await Products.find().sort({ discountPrice: -1 }).limit(4);

  if (!product) {
    res.status(404);
    throw new Error("Product not Found");
  }

  res.json(product);
});

export const getInformation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const information = await Product.findById(id).select(" productInformation");
  if (!information) {
    res.status(404);
    throw new Error("Product Not Found");
  }

  res.json(information);
});

export const postReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }
  const exist = product.reviews.find(
    (x) => req.user._id.toString() === x.user._id.toString()
  );
  if (exist) {
    res.status(400);
    throw new Error("You have Already Reviewed This Product");
  }

  const sumRat =
    product.reviews.reduce((acc, cur) => acc + cur.rating, 0) + +rating;
  console.log(sumRat);
  const rat = (sumRat / product.numReviews).toFixed(1);
  const review = {
    user: req.user._id,
    comment: comment,
    rating: +rating,
  };
  product.ratings = rat;
  product.numReviews++;
  product.reviews.push(review);

  const updatedProduct = await product.save();

  res.json({
    message: "Your Reviews Has Been Added Successfully",
  });
});

export const getReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .select("ratings numReviews reviews")
    .populate("reviews.user");
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }

  res.json(product);
});
