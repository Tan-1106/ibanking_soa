import express from "express";
import dotenv from "dotenv";
import otpRoutes from "./routes/notification.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "notification-service", status: "ok" });
});

// otp routes
app.use("/notifications", otpRoutes);

export default app;