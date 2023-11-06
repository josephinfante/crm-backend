import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { Component } from "./component.schema";
import { Role } from "./role.schema";

export const Permission = database.define("permissions", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    create: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    update: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    delete: {
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
    },
    component_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Component,
            key: 'id',
        },
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
Permission.hasOne(Role, {foreignKey: 'id', sourceKey: 'role_id'});
Permission.hasOne(Component, {foreignKey: 'id', sourceKey: 'component_id'});