import express from "express";
import * as userService from "../services/user.service.js";

const router = express.Router();

// login
router.post("/login", async (req, res) => {
  try {
    const result = await userService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get user info
router.get("/me", async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    const user = await userService.getUserById(decoded.id, token);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;