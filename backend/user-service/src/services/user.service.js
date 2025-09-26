import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import fetchApi from "../utils/fetchApi.js";
const OTP_SERVICE_URL = process.env.OTP_SERVICE_URL || "http://otp-service:4004"
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://payment-service:4003"
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
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return { token, user: user };
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

  confirmPayment: async (userId, otp, paymentId) => {
    const user = await User.findByPk(userId);
    if (!user)
      throw new ApiError(404, "User not found", "User with ID " + userId + " does not exist");
    let apiEndpoint = `${OTP_SERVICE_URL}/otps/verify`;
    let response = await fetchApi(apiEndpoint, {
      method: "POST",
      body: {
        userId,
        paymentId,
        code: otp
      }
    })
    if (!response.success) {
      throw new ApiError(response.status, response.title, response.message, response.stack);
    }
    apiEndpoint = `${PAYMENT_SERVICE_URL}/payments/${paymentId}`;
    response = await fetchApi(apiEndpoint, { method: "GET" });
    if (!response.success) {
      throw new ApiError(response.status, response.title, response.message, response.stack);
    }
    const payment = response.data;
    if (user.balance < payment.totalAmount) {
      throw new ApiError(400, "Insufficient balance", "User");
    }
    await userService.deductBalance(userId, payment.totalAmount);
    apiEndpoint = `${PAYMENT_SERVICE_URL}/payments/confirm/${paymentId}`;
    response = await fetchApi(apiEndpoint, { method: "GET" });
    if (!response.success) {
      throw new ApiError(response.status, response.title, response.message, response.stack);
    }
    return response.data;
  }
};
export {
  userService
}