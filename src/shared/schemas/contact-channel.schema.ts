import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";

export const ContactChannel = database.define("contact_channels", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_automatic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_manual: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});