import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NotificationTemplate = sequelize.define("NotificationTemplate", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: "notification_templates",
    timestamps: true
});

export default NotificationTemplate;