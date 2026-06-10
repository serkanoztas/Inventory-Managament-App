import express from 'express';
import categoryController from "../controllers/categoryController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/add', authMiddleware, categoryController.addCategory);
router.get('/get', authMiddleware, categoryController.getCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

export default router;