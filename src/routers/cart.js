import express from 'express'
import { changeQuantity, create, getOne, removeProduct } from '../controllers/cart.js'

const routerCart = express.Router()
routerCart.get("/cart/:id", getOne)
routerCart.post("/cart/:id", create)
routerCart.delete("/cart/:id", removeProduct)
routerCart.patch("/cart/:id", changeQuantity)
export default routerCart
