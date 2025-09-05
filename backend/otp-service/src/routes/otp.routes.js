import express from "express";
import { send, verify } from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/send", send);
router.post("/verify", verify);

export default router;