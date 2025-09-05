import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "auth-service", status: "ok" });
});

// auth routes
app.use("/auth", authRoutes);

export default app;