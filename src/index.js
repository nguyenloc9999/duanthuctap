import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routerAuth from "./routers/auth.js";
import routerProduct from "./routers/product.js";
import routerCategory from "./routers/category.js";
import routerStatus from "./routers/status.js";
import routerComment from "./routers/comments.js";
import routerCoupons from "./routers/coupons.js";
import routerOrder from "./routers/order.js";
import cartRouter from "./routers/cart.js";
import routerPayment from "./routers/payments.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routerAuth);
app.use("/api", routerProduct);
app.use("/api", routerCategory);
app.use("/api", routerStatus);
app.use("/api", routerComment);
app.use("/api", routerOrder);
app.use("/api", cartRouter);
app.use("/api", routerCoupons)
app.use("/api", routerPayment);
app.listen(8081, async () => {
  await mongoose.connect(process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Server is running 8081");
});