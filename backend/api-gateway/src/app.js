import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import proxy from "express-http-proxy";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://user-service:4001";
const STUDENT_SERVICE_URL = process.env.STUDENT_SERVICE_URL || "http://student-service:4002";
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://payment-service:4003";
const OTP_SERVICE_URL = process.env.OTP_SERVICE_URL || "http://otp-service:4004";
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || "http://notification-service:4005";
const user = proxy(USER_SERVICE_URL);
const student = proxy(STUDENT_SERVICE_URL);
const payment = proxy(PAYMENT_SERVICE_URL);
const otp = proxy(OTP_SERVICE_URL);
const notification = proxy(NOTIFICATION_SERVICE_URL);
app.use("/user", user);
app.use("/student", student);
app.use("/payment", payment);
app.use("/otp", otp);
app.use("/notification", notification);


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