import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
    monthlyRequestCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", schema);
