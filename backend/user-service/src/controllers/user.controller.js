import * as userService from "../services/user.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
// 1 Register
export const register = async (req, res) => {
  const { username, password, fullName, email } = req.body;
  const newUser = await userService.registerUser({ username, password, fullName, email });
  res.status(201).json(new ApiResponse(201, "User registered successfully", newUser));
};

// 2 Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.loginUser({ email, password });
  res.status(200).json(new ApiResponse(200, "Login successful", result));
};

// 3 Get user by ID
export const getUser = async (req, res) => {

  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) {
    throw new ApiError(404, "User not found", " User with ID " + id + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));

};

// 4 Get user by email
export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "User not found", " User with email " + email + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));

};

// 5 Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedUser = await userService.updateUser(id, updates);
  if (!updatedUser) {
    throw new ApiError(404, "User not found", " User with ID " + id + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "User updated successfully", updatedUser));

};

// 6 Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deleted = await userService.deleteUser(id);
  if (!deleted) {
    throw new ApiError(404, "User not found", " User with ID " + id + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "User deleted successfully", null));

};

// 7 Get current user (from auth middleware)
export const getMe = async (req, res) => {
  const userId = req.user.id; // from auth middleware
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found", " User with ID " + userId + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));

};

// 8 POST /users/:userId/deduct-balance
export const deductBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;
    const updatedUser = await userService.deductBalance(userId, amount);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 9 POST /users/:userId/refund
export const refundBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;
    const updatedUser = await userService.refundBalance(userId, amount);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};