import express from "express";
import dotenv from "dotenv";
import otpRoutes from "./routes/otp.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "otp-service", status: "ok" });
});

// health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// otp routes
app.use("/otps", otpRoutes);
app.use(errorHandler);
export default app;