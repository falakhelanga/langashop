import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewsSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    price: {
      required: true,
      type: Number,
    },
    productName: {
      required: true,
      type: String,
    },

    image: {
      required: true,
      type: String,
    },

    detailsImage: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      required: true,
      type: String,
    },

    productInformation: {
      categories: {
        type: String,
      },

      waranty: {
        type: Number,
        required: true,
      },

      basicColours: {
        type: String,
        required: true,
      },

      screenTypes: {
        type: String,
        required: true,
      },

      touchScreenEnabled: {
        type: String,
        required: true,
      },

      isMultiTouch: {
        type: String,
        required: true,
      },

      graphicsProcessor: {
        type: String,
        required: true,
      },

      cpuSpeed: {
        type: String,
        required: true,
      },

      OperatingSystem: {
        type: String,
        required: true,
      },
      storageCapacity: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      screenSize: {
        type: String,
        required: true,
      },

      numberOfHdmiPorts: {
        type: Number,
        required: true,
      },
      hardDriveTpye: {
        type: String,
        required: true,
      },
      ramSize: {
        type: Number,
        required: true,
      },

      inTheBox: [
        {
          type: String,
        },
      ],
      ramType: {
        type: String,
        required: true,
      },

      materials: {
        type: String,
        required: false,
      },
      cpuType: {
        type: String,
        required: true,
      },
      displayStandard: {
        type: String,
        required: false,
      },
      cacheSize: {
        type: Number,
        required: false,
      },
      model: {
        type: String,
        required: true,
      },
      numberOfusbPorts: {
        type: Number,
        required: true,
      },
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewsSchema],
    numStock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
