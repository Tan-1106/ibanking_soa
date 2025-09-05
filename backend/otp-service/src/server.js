import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import otpRoutes from "./routes/otp.routes.js";
import OTP from "./models/otp.model.js"; // import để Sequelize biết model

dotenv.config();
const app = express();
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "otp-service", status: "ok" });
});

// otp routes
app.use("/otp", otpRoutes);

const PORT = process.env.PORT || 4003;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ OTP DB connected successfully.");

    // sync model OTP => tự tạo bảng otps
    await sequelize.sync({ alter: true });
    console.log("✅ OTP table synced.");

    app.listen(PORT, () => {
      console.log(`🚀 otp-service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start otp-service:", err.message);
    process.exit(1);
  }
}

startServer();