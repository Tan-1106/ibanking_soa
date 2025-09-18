import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Fee from "./fee.model.js";
const StudentFee = sequelize.define("StudentFee", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false }, // logical FK to students.id
  feeId: { type: DataTypes.INTEGER, allowNull: false },     // logical FK to fees.id
  amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  dueDate: { type: DataTypes.DATEONLY, allowNull: true },
  status: { type: DataTypes.ENUM("pending", "paid"), allowNull: false, defaultValue: "pending" },
  paidAt: { type: DataTypes.DATE, allowNull: true },
  paymentRef: { type: DataTypes.STRING(100), allowNull: true } // optional
}, {
  tableName: "student_fees",
  timestamps: true
});

Fee.hasMany(StudentFee, { foreignKey: "feeId" });
StudentFee.belongsTo(Fee, { foreignKey: "feeId" });

export default StudentFee;