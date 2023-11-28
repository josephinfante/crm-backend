import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { ComponentModel } from "./component.model";
import { RoleModel } from "./role.model";
import { UserModel } from "./user.model";

export const PermissionModel = database.define("permissions", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    create: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    update: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    delete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    read_all: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    read_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Date.now(),
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Date.now(),
    },
    component_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ComponentModel,
            key: 'id',
        },
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: RoleModel,
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: UserModel,
            key: 'id',
        },
    }
});
PermissionModel.hasOne(RoleModel, {foreignKey: 'id', sourceKey: 'role_id'});
PermissionModel.hasOne(ComponentModel, {foreignKey: 'id', sourceKey: 'component_id'});
UserModel.hasMany(PermissionModel, {foreignKey: 'user_id', sourceKey: 'id'});