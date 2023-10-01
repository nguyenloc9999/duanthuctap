import express from "express";
import { getAll, get, create, remove, update } from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";
// import { checkPermission } from "../middlewares/checkPermission";

const routerProduct = express.Router();

routerProduct.get("/products", getAll);
routerProduct.get("/products/:id", get);
routerProduct.post("/products",checkPermission, create);
routerProduct.delete("/products/:id", checkPermission, remove);
routerProduct.patch("/products/:id", checkPermission, update);

export default routerProduct;