import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";

export const Page = database.define("pages", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    role_ids: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});