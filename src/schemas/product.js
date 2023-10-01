import Joi from "joi";

export const ProductSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required().messages({
        "string.empty": "Tên bắt buộc nhập",
        "any.required": "Trường tên bắt buộc nhập"
    }),
    author: Joi.string().required().messages({
        "string.empty": "Tên tác giả bắt buộc nhập",
        "any.required": "Trường tên tác giả bắt buộc nhập"
    }),
    price: Joi.number().required().messages({
        "string.empty": "Giá bắt buộc nhập",
        "any.required": "Trường giá bắt buộc nhập",
        "number.base": "Giá phải là số"
    }),
    image: Joi.object().required().messages({
        "string.empty": "Ảnh bắt buộc nhập",
        "any.required": "Trường ảnh bắt buộc nhập"
    }),
    description: Joi.string(),
    categoryId: Joi.string().required().messages({
        "string.empty": "Danh mục bắt buộc nhập",
        "any.required": "Trường danh mục bắt buộc nhập",
        "string.base": "Danh mục phải là string"
    }),
})