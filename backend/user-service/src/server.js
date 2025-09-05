import app from "./app.js";
import sequelize from "./config/db.js";
import User from "./models/user.model.js"; // import để Sequelize biết model

const PORT = process.env.PORT || 4001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ User DB connected successfully.");

    // sync model User => tự tạo bảng users
    await sequelize.sync({ alter: true });
    console.log("✅ User table synced.");

    app.listen(PORT, () => {
      console.log(`🚀 user-service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start user-service:", err.message);
    process.exit(1);
  }
}

startServer();