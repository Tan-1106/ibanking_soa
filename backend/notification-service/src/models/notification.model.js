// models/notification.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Notification = sequelize.define("Notification", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: true },
  channel: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "email" },
  to: { type: DataTypes.STRING(255), allowNull: false },
  subject: { type: DataTypes.STRING(255), allowNull: true },
  body: { type: DataTypes.TEXT, allowNull: true },
  paymentId: { type: DataTypes.BIGINT, allowNull: true },
  invoiceData: { type: DataTypes.JSON, allowNull: true },
  status: { type: DataTypes.ENUM("pending","sent","failed"), allowNull: false, defaultValue: "pending" },
  errorMessage: { type: DataTypes.TEXT, allowNull: true },
  sentAt: { type: DataTypes.DATE, allowNull: true },
  meta: { type: DataTypes.JSON, allowNull: true }
}, {
  tableName: "notifications",
  timestamps: true
});

export default Notification;