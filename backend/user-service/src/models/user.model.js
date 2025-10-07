import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING(100), allowNull: false },
  phoneNumber: { type: DataTypes.STRING(10), allowNull: false },
  password: { type: DataTypes.STRING(255), allowNull: false },
  fullName: { type: DataTypes.STRING(200), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, validate: { isEmail: true } },
  balance: { type: DataTypes.DECIMAL(15, 2), allowNull: false, defaultValue: 0.00 }
}, {
  tableName: "users",
  timestamps: true,
  indexes: [
    { unique: true, fields: ["username"] },
    { unique: true, fields: ["email"] }
  ]
});

export default User;