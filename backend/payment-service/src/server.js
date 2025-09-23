import app from "./app.js";
import sequelize from "./config/db.js";

const PORT = process.env.PORT || 4001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Payment DB connected successfully.");

    // sync model Payment => tự tạo bảng payments
    await sequelize.sync({ alter: true });
    console.log("✅ Payment table synced.");

    app.listen(PORT, () => {
      console.log(`🚀 payment-service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    console.error("❌ Failed to start payment-service:", err.message);
    process.exit(1);
  }
}

startServer();