import app from "./app.js";
import sequelize from "./config/db.js";

const PORT = process.env.PORT || 4001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Notification DB connected successfully.");

    // sync model Payment => tự tạo bảng payments
    await sequelize.sync({ alter: true });
    console.log("✅ Notification table synced.");

    app.listen(PORT, () => {
      console.log(`🚀 notification-service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start notification-service:", err.message);
    process.exit(1);
  }
}

startServer();