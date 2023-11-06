import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { Role } from "./role.schema";

export const User = database.define("users", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
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
User.hasOne(Role, {foreignKey: 'id', sourceKey: 'role_id'});
