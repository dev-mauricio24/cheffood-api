import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsByCategory,
  updateProduct,
} from "../controllers/product.js";
import { postProductValidator } from "../middlewares/validateFields.js";

const router = Router();

router.get("/", getProducts);
router.get("/category", getProductsByCategory);
router.post("/", [ postProductValidator ], createProduct);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
