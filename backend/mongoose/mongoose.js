import mongoose from "mongoose";

const connectTomongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to db");
  } catch (error) {
    res.status(500);
    throw new Error("Problem With MongoDB");
  }
};

export default connectTomongoose;
