import user from "../models/auth.js";
import bcrypt from "bcryptjs";
import User from "../models/auth.js";
import jwt from "jsonwebtoken";

import { signinSchema, signupSchema } from "../schemas/auth.js";



export const getAll = async (req, res) => {
    try {
        const data = await user.find();
        return res.status(200).json({
            message: "Lấy tất cả người dùng thành công",
            data
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
};

export const getOneById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await user.findById(id);
        if (data.length === 0) {
            return res.status(404).json({
                message: "Lấy thông tin 1 người dùng thất bại",
            })
        }
        const { _id, first_name, last_name, password, email, address, phone, role, avatar, createdAt } = data;

        return res.status(200).json({
            message: "Lấy thông tin 1 người dùng thành công",
            _id, first_name, last_name, password, email, address, phone, role, avatar, createdAt
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
};

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await user.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Xóa thông tin người dùng thành công",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
};

export const signup = async(req, res) => {
    try {
        const {error} = signupSchema.validate(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0].message,
            })
        }
        const { first_name, last_name, email, phone, address, avatar, password } = req.body;
        const findEmail = await User.findOne({email});
        if(findEmail) {
            return res.status(400).json({
                message: "Email này đã được đăng ký",
            })
        }
        const passwordhash = await bcrypt.hash(password, 10)
        const user = await User.create({
            first_name,
            last_name,
            phone,
            address,
            avatar,
            email,
            password: passwordhash,
        })
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng ký tài khoản thành công",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}


export const signin = async(req, res) => {
    try {
        const {error} = signinSchema.validate(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0].message,
            })
        }
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            })
        }
        const token = jwt.sign({id: user._id}, "thuctap", {
        expiresIn: "1d"
        })
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
        })
    }
}