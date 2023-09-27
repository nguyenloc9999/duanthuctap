import express from "express";
import { create, getAllComment, getCommentFromProduct, getOneComment, removeCommentByUser, updateComment } from "../controllers/comments.js";

const routerComment = express.Router();

routerComment.get("/comments/:productId", getCommentFromProduct);
routerComment.get("/comments/:id/detail", getOneComment);
routerComment.get("/comments", getAllComment)
routerComment.delete("/comments/:id/remove", removeCommentByUser);
// routerComment.delete("/comment/:id/admin", authenticate, authorization, removeCommentByAdmin);
routerComment.post("/comments", create);
routerComment.patch("/comments/:id", updateComment);


export default routerComment;