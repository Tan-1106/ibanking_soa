import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import otpRoutes from "./routes/otp.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "otp-service", status: "ok" });
});

// otp routes
app.use("/otps", otpRoutes);

export default app;