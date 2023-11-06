import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { Role } from "./role.schema";

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
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Role,
            key: 'id',
        },
    },
});
Page.hasOne(Role, {foreignKey: 'id', sourceKey: 'role_id'});