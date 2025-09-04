import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OTP = sequelize.define("OTP", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false },
  purpose: { type: DataTypes.STRING, allowNull: false }, // "login" | "payment"
  expiresAt: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: "otps",
  timestamps: true
});

export default OTP;