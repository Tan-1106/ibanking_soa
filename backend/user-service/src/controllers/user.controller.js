import * as userService from "../services/user.service.js";

// 1 Register
export const register = async (req, res) => {
  try {
    const { username, password, fullName, email } = req.body;
    const newUser = await userService.registerUser({ username, password, fullName, email });
    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser({ email, password });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// 3 Get user by ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4 Get user by email
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5 Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await userService.updateUser(id, updates);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully", user: updatedUser });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 6 Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7 Get current user (from auth middleware)
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};