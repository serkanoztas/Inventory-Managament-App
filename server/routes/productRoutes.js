import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, productController.addProduct);

router.get("/get", authMiddleware, productController.getProducts);

router.put("/update/:id", authMiddleware, productController.updateProduct);

router.delete("/delete/:id", authMiddleware, productController.deleteProduct);

export default router;