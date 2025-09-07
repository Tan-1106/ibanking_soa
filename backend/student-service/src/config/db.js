import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

async function connectWithRetry(retries = 10, delay = 5000) {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("✅ Database connected successfully.");
      break;
    } catch (err) {
      console.error("❌ DB connection failed, retrying in 5s...", err.message);
      retries--;
      if (retries === 0) process.exit(1);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

connectWithRetry();

export default sequelize;