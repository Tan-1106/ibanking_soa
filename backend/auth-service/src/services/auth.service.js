import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "Thang123";

// nếu chạy trong Docker Compose, hostname = service name trong docker-compose.yml
// còn test Postman local thì sửa lại thành http://localhost:4001
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://user-service:4001";

export const login = async (email, password) => {
  // gọi sang user-service để lấy user theo email
  const res = await axios.get(`${USER_SERVICE_URL}/users/email/${email}`);
  const user = res.data;

  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  return { token, userInfo: user };
};

export const refreshToken = (oldToken) => {
  try {
    const decoded = jwt.verify(oldToken, JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, JWT_SECRET, { expiresIn: "1h" });
    return newToken;
  } catch {
    throw new Error("Invalid token");
  }
};