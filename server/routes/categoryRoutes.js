import express from 'express';
import categoryController from "../controllers/categoryController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/add', authMiddleware, categoryController.addCategory);
router.get('/get', authMiddleware, categoryController.getCategory);
router.put("/update/:id", authMiddleware, categoryController.updateCategory);
router.delete("/delete/:id", authMiddleware, categoryController.deleteCategory);


export default router;