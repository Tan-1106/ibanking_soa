import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import userRoutes from "./routes/fee.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "fee-service", status: "ok" });
});

// user routes
app.use("/fees", userRoutes);

export default app;