import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  paymentRef: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  payerUserId: { type: DataTypes.INTEGER, allowNull: false }, // reference to users.id (logical)
  studentMssv: { type: DataTypes.STRING(50), allowNull: false },
  totalAmount: { type: DataTypes.DECIMAL(15,2), allowNull: false },
  status: { type: DataTypes.ENUM("pending","success","failed","cancelled"), allowNull: false, defaultValue: "pending" },
  expiresAt: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: "payments",
  timestamps: true
});

export default Payment;