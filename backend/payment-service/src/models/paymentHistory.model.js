import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PaymentHistory = sequelize.define("PaymentHistory", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },

  // tham chiếu tới payment (logical)
  paymentId: { type: DataTypes.BIGINT, allowNull: false },

  // loại sự kiện
  eventType: { type: DataTypes.STRING(100), allowNull: false },

  // dữ liệu chi tiết của event
  eventData: { type: DataTypes.JSON, allowNull: true },

  // ai/gì thực hiện event
  actorType: { typeTran: DataTypes.STRING(50), allowNull: true },

  // id người thực hiện
  actorId: { type: DataTypes.INTEGER, allowNull: true },
  note: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: "payment_histories",
  timestamps: true,
  indexes: [
    { fields: ["paymentId"] },
    { fields: ["eventType"] },
    { fields: ["createdAt"] }
  ]
});

export default PaymentHistory;