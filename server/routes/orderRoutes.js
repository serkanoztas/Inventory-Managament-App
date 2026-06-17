import express from "express";
import {
    createOrder,
    getAllOrders,
    getMyOrders,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// create order
router.post("/create", authMiddleware, createOrder);

// admin - all orders
router.get("/all", authMiddleware, getAllOrders);

// customer - my orders
router.get("/my", authMiddleware, getMyOrders);

export default router;