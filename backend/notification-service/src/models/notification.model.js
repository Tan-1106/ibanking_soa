// models/notification.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Notification = sequelize.define("Notification", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM("sent", "failed", "pending"), defaultValue: "pending" },
}, {
  tableName: "notifications",
  timestamps: true
});
export default Notification;