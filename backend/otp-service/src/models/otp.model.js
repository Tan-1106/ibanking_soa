import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OTP = sequelize.define("OTP", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING(6), allowNull: false },
  userId: { type: DataTypes.BIGINT, allowNull: false },
  paymentId: { type: DataTypes.BIGINT, allowNull: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: "otps",
  timestamps: true
});

export default OTP;