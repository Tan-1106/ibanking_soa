import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import "dotenv/config";
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided", "Authorization header is missing or invalid");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid token", err.message);
  }
};

export default authMiddleware;