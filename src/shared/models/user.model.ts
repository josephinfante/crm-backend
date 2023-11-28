import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { RoleModel } from "./role.model";

export const UserModel = database.define("users", {
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
        defaultValue: 'DNI',
    },
    document_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    super_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Date.now(),
    },
    updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Date.now(),
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: RoleModel,
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    }
});
UserModel.hasOne(RoleModel, { foreignKey: 'id', sourceKey: 'role_id' });