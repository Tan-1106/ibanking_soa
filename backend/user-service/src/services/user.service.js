import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });
  return user;
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const getUserById = async (id) => {
  return await User.findByPk(id);
};

export const updateUser = async (id, data) => {
  await User.update(data, { where: { id } });
  return await User.findByPk(id);
};

export const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};