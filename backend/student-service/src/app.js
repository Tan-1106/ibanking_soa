import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/student.routes.js";
import feeRoutes from "./routes/fee.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

// route
app.get("/", (req, res) => {
  res.json({ service: "student-service", status: "ok" });
});

// user routes
app.use("/students", userRoutes);
app.use("/fees", feeRoutes);

export default app;