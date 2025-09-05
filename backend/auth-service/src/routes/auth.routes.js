import express from "express";
import { login, refresh } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", login);
router.post("/refresh-token", refresh);

export default router;