import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
// 1 Register a new user
export const registerUser = async ({ username, password, fullName, email }) => {
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
}

// 2 Login user
export const loginUser = async ({ email, password }) => {
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
}

// 3 Get user by ID
export const getUserById = async (id) => {
  return await User.findByPk(id, { attributes: { exclude: ['password'] } });
}

// 4 Get user by email
export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
}

// 5 Update user
export const updateUser = async (id, updates) => {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  await user.update(updates);
  return user;
}

// 6 Delete user
export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    return false;
  }
  await user.destroy();
  return true;
}

// 7 Get current user (dummy implementation)
export const getCurrentUser = async (userId) => {
  return await User.findByPk(userId, { attributes: { exclude: ['password'] } });
}

// 8 Deduct balance
export const deductBalance = async (userId, amount) => {
  const user = await User.findByPk(userId);
  if (!user)
    throw new ApiError(404, "User not found", "User");

  if (parseFloat(user.balance) < parseFloat(amount)) {
    throw new ApiError(400, "Insufficient balance", "User");
  }

  user.balance = parseFloat(user.balance) - parseFloat(amount);
  await user.save();
  return user;
};

// 9 Refund balance
export const refundBalance = async (userId, amount) => {
  const user = await User.findByPk(userId);
  if (!user)
    throw new ApiError(404, "User not found", "User with ID " + userId + " does not exist");

  user.balance = parseFloat(user.balance) + parseFloat(amount);
  await user.save();
  return user;
};