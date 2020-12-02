import productData from "./data/productData.js";
import users from "./data/userData.js";
import dotenv from "dotenv";
import mongoose from "./mongoose/mongoose.js";

import userModel from "./models/userModel.js";
import productModel from "./models/productModel.js";

dotenv.config();

mongoose();

const importData = async () => {
  try {
    await userModel.deleteMany();
    await productModel.deleteMany();

    const userImported = await userModel.insertMany(users);

    const modifiedProduct = productData.map((cur) => {
      return { ...cur, user: userImported[0]._id };
    });

    await productModel.insertMany(modifiedProduct);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await userModel.deleteMany();
    await productModel.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
