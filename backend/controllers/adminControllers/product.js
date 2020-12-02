import Product from "../../models/productModel.js";
import asycHandler from "express-async-handler";

export const getProducts = asycHandler(async (req, res, next) => {
  const products = await Product.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  if (!products) {
    res.status(404);
    throw new Error("Product Not Found");
  }

  res.json(products);
});

export const deleteProduct = asycHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("user not found");
  }

  await product.remove();
  res.json({
    message: "product deleted",
  });
});

export const createProduct = asycHandler(async (req, res, next) => {
  const {
    price,
    productName,
    image,
    detailsImage,
    description,

    waranty,
    basicColours,
    screenTypes,
    touchScreenEnabled,
    isMultiTouch,
    graphicsProcessor,
    cpuSpeed,
    OperatingSystem,
    storageCapacity,
    brand,
    screenSize,

    numberOfHdmiPorts,
    hardDriveTpye,
    ramSize,

    ramType,

    cpuType,

    model,
    numberOfusbPorts,
    productDiscount,
    numStock,
  } = req.body;

  const productObject = {
    user: req.user._id,
    price,
    productName,
    image,
    detailsImage,
    description,
    discountPrice: productDiscount,
    productInformation: {
      waranty,
      basicColours,
      screenTypes,
      touchScreenEnabled,
      isMultiTouch,
      graphicsProcessor,
      cpuSpeed,
      OperatingSystem,
      storageCapacity,
      brand,
      screenSize,

      numberOfHdmiPorts,
      hardDriveTpye,
      ramSize,

      ramType,

      cpuType,

      model,
      numberOfusbPorts,
    },
    numStock,
  };

  const createdProduct = await Product.create(productObject);

  if (!createdProduct) {
    res.status(500);
    throw new Error("Product is Not Created");
  }

  res.status(201).json(createdProduct);
});
