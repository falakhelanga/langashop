import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  wishlist: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
