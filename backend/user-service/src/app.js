import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "user-service", status: "ok" });
});

// health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// user routes
app.use("/users", userRoutes);

export default app;