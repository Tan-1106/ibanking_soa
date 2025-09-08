import express from "express";
import * as studentService from "../services/student.service.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// find student by mssv
router.get("/:mssv", authMiddleware, async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const student = await studentService.getStudentByMssv(req.params.mssv, token);
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;