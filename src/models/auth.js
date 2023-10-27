import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        default: "member"
    },
    image: {
        type: Object
    }
});

export default mongoose.model("User", userSchema);