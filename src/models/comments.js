import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
},
{ timestamps: true, versionKey: false }
);
export default mongoose.model("Comment", CommentSchema);