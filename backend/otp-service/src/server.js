import app from "./app.js";
import sequelize from "./config/db.js";

const PORT = process.env.PORT || 4001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ OTP DB connected successfully.");

    // sync model Payment => tự tạo bảng payments
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