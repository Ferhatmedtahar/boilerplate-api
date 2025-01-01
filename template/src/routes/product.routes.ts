import express from "express";

import { protect, restrictTO } from "../controllers/auth.controller";
import {
  aliasTopProducts,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductStats,
  resizeProductImages,
  updateProduct,
  uploadProductImages,
} from "../controllers/product.controller";

import {
  checkProductSchema,
  updateProductSchema,
} from "../validators/product.validator";
import { validateRequest } from "../validators/validate";

const router = express.Router();

// router.use("/:productId/reviews", reviewRouter);

router.route("/top-5-cheap").get(aliasTopProducts, getAllProducts);

router.route("/stats").get(getProductStats);

// £ basic CRUD operatios
router
  .route("/")
  .get(getAllProducts)
  .post(
    protect,
    restrictTO("admin", "seller"),
    uploadProductImages,
    resizeProductImages,
    validateRequest(checkProductSchema),
    createProduct
  );

router
  .route("/:id")
  .patch(
    protect,
    restrictTO("admin", "seller"),
    uploadProductImages,
    resizeProductImages,
    validateRequest(updateProductSchema),
    updateProduct
  )
  .delete(protect, restrictTO("admin", "seller"), deleteProduct)
  .get(getProduct);

// router
//   .route("/:productId/reviews")
//   .post(protect, restrictTO("user"), createReview);

export default router;
