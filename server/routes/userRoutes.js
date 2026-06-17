import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, userController.addUser);

router.get("/get", authMiddleware, userController.getUsers);

router.put("/update/:id", authMiddleware, userController.updateUser);

router.delete("/delete/:id", authMiddleware, userController.deleteUser);

router.put("/me", authMiddleware, userController.updateMyProfile);

export default router;