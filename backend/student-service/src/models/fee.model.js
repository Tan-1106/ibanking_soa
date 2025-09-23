import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Fee = sequelize.define("Fee", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  subject: { type: DataTypes.STRING(500), allowNull: false },
  amount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  semester: { type: DataTypes.INTEGER, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "fees",
  timestamps: true,
  indexes: [
    { unique: true, fields: ["subject"] }]
});

export default Fee;