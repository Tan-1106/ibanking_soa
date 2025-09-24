import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    throw new ApiError(401, "Invalid token", "Token verification failed" + err.message);
  }
};

export default authMiddleware;