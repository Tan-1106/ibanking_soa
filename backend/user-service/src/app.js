import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "user-service", status: "ok" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// user routes
app.use("/users", userRoutes);
app.use(errorHandler);
export default app;