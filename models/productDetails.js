import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sold: {
      type: Boolean,
      required: true,
    },
    dateOfSale: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: false,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
