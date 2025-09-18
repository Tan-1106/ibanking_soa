import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Student = sequelize.define("Student", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  sID: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  fullName: { type: DataTypes.STRING(200), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: true },
}, {
  tableName: "students",
  timestamps: true
});

export default Student;