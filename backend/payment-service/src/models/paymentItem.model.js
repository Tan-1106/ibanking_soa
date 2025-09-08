import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PaymentItem = sequelize.define("PaymentItem", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  paymentId: { type: DataTypes.BIGINT, allowNull: false },
  studentFeeId: { type: DataTypes.INTEGER, allowNull: false }, // reference to student_fees.id (logical)
  amount: { type: DataTypes.DECIMAL(15,2), allowNull: false }
}, {
  tableName: "payment_items",
  timestamps: true
});

export default PaymentItem;