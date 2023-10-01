import express from "express";
import { create, getAll, getCommentFromProduct, getOneComment, removeComment, updateComment } from "../controllers/comments.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerComment = express.Router();

routerComment.get("/comment/:productId", getCommentFromProduct)
routerComment.get("/comment/:id/detail", getOneComment)
routerComment.post("/comment", create)
routerComment.patch("/comment/:id", updateComment, checkPermission)
routerComment.delete("/comment/:id", removeComment)
routerComment.get("/comment", getAll)

export default routerComment;