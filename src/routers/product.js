import express from "express";
import { getAll, get, create, remove, update } from "../controllers/product.js";
// import { checkPermission } from "../middlewares/checkPermission";

const routerProduct = express.Router();

routerProduct.get("/products", getAll);
routerProduct.get("/products/:id", get);
routerProduct.post("/products", create);
routerProduct.delete("/products/:id", remove);
routerProduct.patch("/products/:id", update);

export default routerProduct;