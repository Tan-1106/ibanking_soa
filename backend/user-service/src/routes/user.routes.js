import express from "express";
import {
  register,
  login,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getMe,
  deductBalance,
  refundBalance
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema, updateUserSchema } from "../schemas/user.schema.js";

const router = express.Router();

// Public register/login
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// Auth required routes (use auth middleware in real)
router.get("/me", authMiddleware, getMe); // trả user hiện tại + balance front 2

// CRUD for users (admin or owner checks in controller)
router.get("/:id", authMiddleware, getUser);
router.get("/email/:email", authMiddleware, getUserByEmail);
router.put("/:id", authMiddleware, validate(updateUserSchema), updateUser);
router.delete("/:id", authMiddleware, deleteUser);

router.post("/:userId/deduct-balance", authMiddleware, deductBalance); // gọi route này từ payment service để trừ tiền nè
router.post("/:userId/refund", authMiddleware, refundBalance); // gọi route này từ payment service để hoàn tiền nè

export default router;