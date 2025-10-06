import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import fetchApi from "../utils/fetchApi.js";
const OTP_SERVICE_URL = process.env.OTP_SERVICE_URL || "http://otp-service:4004"
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://payment-service:4003"
const NOTIFICATION_SERVICE_URL = "http://notification-service:4005"
const userService = {
  registerUser: async ({ username, password, fullName, email }) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(400, "Email already in use", " A user with email " + email + " already exists ");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      fullName,
      email
    });
    return newUser;
  },

  loginUser: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(401, "Login failed", "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Login failed", "Invalid email or password");
    }
    const access = jwt.sign(
      {
        id: user.id,
        email: user.email,
        type: "access"
      },
      process.env.JWT_SECRET,
      { expiresIn: '30s' }
    );
    const refresh = jwt.sign(
      {
        type: "refresh",
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { access, refresh, user: user };
  },
  refreshToken: async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== "refresh") {
      throw new ApiError(401, "Invalid token", "Token is not a refresh token");
    }
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new ApiError(404, "User not found", " User with ID " + decoded.id + " does not exist");
    }
    const newAccess = jwt.sign(
      {
        id: user.id,
        email: user.email,
        type: "access"
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const newRefresh = jwt.sign(
      {
        type: "refresh",
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return { access: newAccess, refresh: newRefresh };
  },
  getUserById: async (id) => {
    return await User.findByPk(id, { attributes: { exclude: ['password'] } });
  },

  getUserByEmail: async (email) => {
    return await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
  },

  updateUser: async (id, updates) => {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    await user.update(updates);
    return user;
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      return false;
    }
    await user.destroy();
    return true;
  },

  getCurrentUser: async (userId) => {
    return await User.findByPk(userId, { attributes: { exclude: ['password'] } });
  },

  deductBalance: async (userId, amount) => {
    const user = await User.findByPk(userId);
    if (!user)
      throw new ApiError(404, "User not found", "User");

    if (parseFloat(user.balance) < parseFloat(amount)) {
      throw new ApiError(400, "Insufficient balance", "User");
    }

    user.balance = parseFloat(user.balance) - parseFloat(amount);
    await user.save();
    return user;
  },

  refundBalance: async (userId, amount) => {
    const user = await User.findByPk(userId);
    if (!user)
      throw new ApiError(404, "User not found", "User with ID " + userId + " does not exist");

    user.balance = parseFloat(user.balance) + parseFloat(amount);
    await user.save();
    return user;
  },

  confirmPayment: async (userId, otp, paymentId, token) => {
    const user = await User.findByPk(userId);
    if (!user)
      throw new ApiError(404, "User not found", "User with ID " + userId + " does not exist");

    let apiEndpoint = `${PAYMENT_SERVICE_URL}/payments/${paymentId}`;
    let response = await fetchApi(apiEndpoint, { method: "GET" });
    if (!response.success) {
      throw new ApiError(response.status, response.title, response.message, response.stack);
    }
    const payment = response.data;
    apiEndpoint = `${OTP_SERVICE_URL}/otps/verify`;
    response = await fetchApi(apiEndpoint, {
      method: "POST",
      body: {
        userId,
        paymentId,
        code: otp
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if (!response.success) {
      throw new ApiError(response.status, response.title, response.message, response.stack);
    }

    if (user.balance < payment.totalAmount) {
      throw new ApiError(400, "Insufficient balance", "User");
    }
    await userService.deductBalance(userId, payment.totalAmount);
    apiEndpoint = `${PAYMENT_SERVICE_URL}/payments/confirm/${paymentId}`;
    response = await fetchApi(apiEndpoint, { method: "GET" });
    if (!response.success) {
      throw new ApiError(response.status, response.title, response.message, response.stack);
    }
    apiEndpoint = `${NOTIFICATION_SERVICE_URL}/notifications/invoice`;
    fetchApi(apiEndpoint, {
      method: "POST",
      body: {
        email: user.email,
        paymentId: payment.id,
        amount: payment.totalAmount,
        paidAt: new Date()
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      console.log("Invoice sent to " + user.email);
    });
    return response.data;
  },
};
export {
  userService
}