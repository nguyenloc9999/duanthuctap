import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Auth",
    required: true
  },
  couponId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
    required: false  // Đặt required là false để cho phép giá trị null
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: String,
      author: Number,
      price: String,
      image: Number,
      description: String,
    }
  ],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: mongoose.Types.ObjectId,
    ref: "Status",
    default: '64e8a93da63d2db5e8d8562a'
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  paymentId: {
    type: String
  },
  paymentCode: {
    type: String
  },
  payerId: {
    type: String
  }
},
  { timestamps: true, versionKey: false });
export default mongoose.model("order", orderSchema);