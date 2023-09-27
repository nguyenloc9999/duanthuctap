import Product from "../models/product.js";
import Category from "../models/category.js";
import { CategorySchema } from "../schemas/category.js"

export const getAll = async (req, res) => {
    try {
        const data = await Category.find().populate("products");
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
        const data = await Category.findById(id).populate("products");
        if (data === 0) {
            return res.status(400).json({
                message: "Hiện danh mục thất bại",
            })
        }
        const products = await Product.find({ categoryId: id });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Category.findById(id);
        if (data === 0) {
            return res.status(400).json({
                message: "Hiện sản phẩm thất bại",
            })
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = CategorySchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Category.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm danh mục thất bại"
            })
        }
        return res.status(200).json({
            message: "Thêm danh mục thành công",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Category.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Xoá danh mục thành công",
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { error } = CategorySchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Category.findByIdAndUpdate({ _id: id }, body, {
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