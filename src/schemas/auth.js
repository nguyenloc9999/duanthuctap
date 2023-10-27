import Joi from "joi";

export const signUpSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email không đuọc để trống",
        "any.required": "Trường email là bắt buộc",
        "string.email": "Email phải đúng định dạng"
    }),
    password: Joi.string().min(6).messages({
        "string.empty": "Password không được để trống",
        "any.required": "Trường password là bắt buộc",
        "string.min": "Ít phất phải 6 kí tự",
    }),
    confirmpassword: Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "Mật khẩu không khớp",
        "string.empty": "Confirm không được để trống",
        "any.required": "Trường confirm là bắt buộc",
    }),
    address: Joi.string(),
    role: Joi.string(),
    image: Joi.object()

});

export const signInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email không được bỏ trống",
        "string.email": "Email phải đúng định dạng",
        "any.required": "Email là trường bắt buộc"
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được bỏ trống",
        "string.min": "Password phải chứa ít nhất {#limit} ký tự",
        "any.required": "Mật khẩu là trường bắt buộc"
    })
})