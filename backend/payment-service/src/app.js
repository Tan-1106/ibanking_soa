import express from "express";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payment.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "payment-service", status: "ok" });
});

// health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// user routes
app.use("/payments", paymentRoutes);
app.use(errorHandler);
export default app;