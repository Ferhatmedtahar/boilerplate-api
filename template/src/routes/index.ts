import express from "express";
import productRouter from "./product.routes";
import userRouter from "./user.routes";

const router = express.Router();

// router.use("/endpoint", endpointRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
export default router;
