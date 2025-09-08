import app from "./app.js";
import sequelize from "./config/db.js";

const PORT = process.env.PORT || 4005;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Student DB connected successfully.");

    // sync model User => tự tạo bảng users
    await sequelize.sync({ alter: true });
    console.log("✅ Student table synced.");

    app.listen(PORT, () => {
      console.log(`🚀 student-service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start student-service:", err.message);
    process.exit(1);
  }
}

startServer();