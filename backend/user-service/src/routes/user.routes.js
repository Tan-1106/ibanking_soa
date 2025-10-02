import express from "express";
import {
  userController
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema, updateUserSchema } from "../schemas/user.schema.js";

const router = express.Router();

router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.get("/me", authMiddleware, userController.getMe);

router.get("/:id", authMiddleware, userController.getUser);
router.get("/email/:email", authMiddleware, userController.getUserByEmail);
router.put("/:id", authMiddleware, validate(updateUserSchema), userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

router.post("/deduct-balance/:userId", authMiddleware, userController.deductBalance);
router.post("/refund/:userId", authMiddleware, userController.refundBalance);
router.post("/confirm-payment", authMiddleware, userController.confirmPayment);
export default router;