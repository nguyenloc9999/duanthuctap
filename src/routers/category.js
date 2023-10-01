import express from "express";
import { getAll, get, create, remove, update, getById } from "../controllers/category.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerCategory = express.Router();

routerCategory.get("/categories", getAll);
routerCategory.get("/categories/:id", getById);
routerCategory.get("/categories/:id", get);
routerCategory.post("/categories", checkPermission,  create);
routerCategory.delete("/categories/:id", checkPermission, remove);
routerCategory.patch("/categories/:id", checkPermission, update);

export default routerCategory;