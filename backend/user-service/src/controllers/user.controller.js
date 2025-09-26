import { userService } from "../services/user.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";

const userController = {
  register: async (req, res) => {
    const { username, password, fullName, email } = req.body;
    const newUser = await userService.registerUser({ username, password, fullName, email });
    res.status(201).json(new ApiResponse(201, "User registered successfully", newUser));
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });
    res.status(200).json(new ApiResponse(200, "Login successful", result));
  },

  getUser: async (req, res) => {

    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      throw new ApiError(404, "User not found", " User with ID " + id + " does not exist");
    }
    res.status(200).json(new ApiResponse(200, "User fetched successfully", user));

  },

  getUserByEmail: async (req, res) => {
    const { email } = req.params;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new ApiError(404, "User not found", " User with email " + email + " does not exist");
    }
    res.status(200).json(new ApiResponse(200, "User fetched successfully", user));

  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await userService.updateUser(id, updates);
    if (!updatedUser) {
      throw new ApiError(404, "User not found", " User with ID " + id + " does not exist");
    }
    res.status(200).json(new ApiResponse(200, "User updated successfully", updatedUser));

  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      throw new ApiError(404, "User not found", " User with ID " + id + " does not exist");
    }
    res.status(200).json(new ApiResponse(200, "User deleted successfully", null));

  },

  getMe: async (req, res) => {
    const userId = req.user.id; // from auth middleware
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found", " User with ID " + userId + " does not exist");
    }
    res.status(200).json(new ApiResponse(200, "User fetched successfully", user));

  },

  deductBalance: async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
    const updatedUser = await userService.deductBalance(userId, amount);
    res.json(new ApiResponse(200, "Balance deducted successfully", updatedUser));
  },

  refundBalance: async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
    const updatedUser = await userService.refundBalance(userId, amount);
    res.status(200).json(new ApiResponse(200, "Balance refunded successfully", updatedUser));
  },
  confirmPayment: async (req, res) => {
    const { userId, otp, paymentId } = req.body;
    const result = await userService.confirmPayment(userId, otp, paymentId);
    res.status(200).json(new ApiResponse(200, "Payment confirmed successfully", result));
  }
};
export { userController };