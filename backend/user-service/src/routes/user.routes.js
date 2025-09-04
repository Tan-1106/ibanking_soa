import express from "express";
import { register, getUser, updateUser, deleteUser, getUserByEmail } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/:id", getUser);
router.get("/email/:email", getUserByEmail);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;