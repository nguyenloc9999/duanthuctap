import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    price: Number,
    image: Object,
    description: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        require: true
    }
    
}, { timestamps: true, versionKey: false });
productSchema.plugin(mongoosePaginate);

// Ngăn chặn việc kiểm tra hợp lệ trước khi lưu
productSchema.statics.validateBeforeSave = false;

productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);