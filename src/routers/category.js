import express from "express";
import { getAll, get, create, remove, update, getById } from "../controllers/category.js";

const routerCategory = express.Router();

routerCategory.get("/categories", getAll);
routerCategory.get("/categories/:id", getById);
routerCategory.get("/categories/:id", get);
routerCategory.post("/categories",  create);
routerCategory.delete("/categories/:id", remove);
routerCategory.patch("/categories/:id", update);

export default routerCategory;