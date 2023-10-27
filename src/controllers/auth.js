import User from "../models/auth.js";
import { signUpSchema, signInSchema } from "../schemas/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import user from "../models/auth.js";
export const signUp = async (req, res) => {
    try {
        const { name, email, password, address, image } = req.body;
        const body = req.body;
        const { error } = signUpSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        };
        const userExit = await User.findOne({ email });
        if (userExit) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            image
        });
        data.password = undefined;

        return res.status(200).json({
            message: "Đăng ký thành công!",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signInSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại!",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không khớp"
            });
        }
        const token = jwt.sign({ id: user._id }, "minh", { expiresIn: "1d" });
        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        })
    } catch (error) {
    }
};
export const getAll = async (req, res) => {
    try {
        const data = await user.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await user.findById(id);
        if (data === 0) {
            return res.status(400).json({
                message: "Hiện tt người dùng thất bại",
            })
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};
export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await user.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Xoá sản phẩm thành công",
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};
export const update = async (req, res) => {

    try {
        const { name, email, address, image, role } = req.body;
        const id = req.params.id;
        const body = req.body;
        const { error } = signUpSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const data = await user.findByIdAndUpdate({ _id: id }, {
            name,
            email,
            address,
            role,
            image
        }, {
            new: true,
        });
        if (data.length === 0) {
            return res.status(400).json({
                message: "Cập nhật danh mục thất bại",
            })
        }
        return res.status(200).json({
            message: "Cập nhật danh mục thành công",
            data,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}