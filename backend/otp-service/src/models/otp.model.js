import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OTP = sequelize.define("OTP", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  code: { type: DataTypes.STRING(20), allowNull: false },
  purpose: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "payment" },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  attempts: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  consumed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, {
  tableName: "otps",
  timestamps: true
});

export default OTP;