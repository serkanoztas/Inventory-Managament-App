import express from 'express';
import supplierController from "../controllers/supplierController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/add', authMiddleware, supplierController.addSupplier);
router.get('/get', authMiddleware, supplierController.getSupplier);
router.put('/update/:id', authMiddleware, supplierController.updateSupplier);
router.delete('/delete/:id', authMiddleware, supplierController.deleteSupplier);

export default router;