import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/student.routes.js";
import feeRoutes from "./routes/fee.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
dotenv.config();
const app = express();

app.use(express.json());

// route
app.get("/", (req, res) => {
  res.json({ service: "student-service", status: "ok" });
});

// health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// user routes
app.use("/students", userRoutes);
app.use("/fees", feeRoutes);
app.use(errorHandler);
export default app;