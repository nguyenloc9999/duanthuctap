import express from "express";
import { getAll, get, remove, signIn, signUp } from "../controllers/auth.js";


const routerAuth = express.Router();

routerAuth.get("/users", getAll);
routerAuth.get("/users/:id", get);
routerAuth.delete("/users/:id", remove);
routerAuth.post("/signup", signUp);
routerAuth.post("/signin", signIn); 

export default routerAuth;