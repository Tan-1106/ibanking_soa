import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  paymentRef: { type: DataTypes.STRING(100), allowNull: false },
  userId: { type: DataTypes.BIGINT, allowNull: false },
  totalAmount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  status: { type: DataTypes.ENUM("pending", "completed", "failed"), allowNull: false, defaultValue: "pending" },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: "payments",
  timestamps: true,
  indexes: [
    { fields: ["paymentRef"], unique: true },
  ]
});

export default Payment;