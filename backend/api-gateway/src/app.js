import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/student", studentRoutes);
app.use("/payment", paymentRoutes);

// health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// test root
app.get("/", (req, res) => {
  res.send("🚀 API Gateway is running");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Gateway error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;