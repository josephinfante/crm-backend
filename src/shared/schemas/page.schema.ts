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
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    internal_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    external_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role_ids: {
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
});