import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Student = sequelize.define("Student", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  mssv: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  fullName: { type: DataTypes.STRING(200), allowNull: false },
  program: { type: DataTypes.STRING(150), allowNull: true },
  email: { type: DataTypes.STRING(255), allowNull: true },
  phone: { type: DataTypes.STRING(30), allowNull: true }
}, {
  tableName: "students",
  timestamps: true
});

export default Student;