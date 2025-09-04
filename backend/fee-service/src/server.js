import app from "./app.js";
import sequelize from "./config/db.js";
import User from "./models/fee.model.js"; // import để Sequelize biết model

const PORT = process.env.PORT || 4004;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Fee DB connected successfully.");

    // sync model User => tự tạo bảng users
    await sequelize.sync({ alter: true });
    console.log("✅ Fee table synced.");

    app.listen(PORT, () => {
      console.log(`🚀 fee-service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start fee-service:", err.message);
    process.exit(1);
  }
}

startServer();