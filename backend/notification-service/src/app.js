import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import notificationRouter from "./routes/notification.routes.js";
dotenv.config();
const app = express();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ service: "notification-service", status: "ok" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/notifications", notificationRouter);
app.use(errorHandler)
export default app;