import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import proxy from "express-http-proxy";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
const user = proxy("http://user-service:4001");
const student = proxy("http://student-service:4002");
const payment = proxy("http://payment-service:4003");
const otp = proxy("http://otp-service:4004");
const notification = proxy("http://notification-service:4005");
app.use("/user", user);
app.use("/student", student);
app.use("/payment", payment);
app.use("/otp", otp);
app.use("/notification", notification);
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