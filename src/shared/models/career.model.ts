import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { SchoolModel } from "./school.model";

export const CareerModel = database.define("careers", {
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
    code: {
        type: DataTypes.STRING,
        allowNull: false,
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
    school_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: SchoolModel,
            key: 'id',
        },
    },
});
SchoolModel.hasMany(CareerModel, { foreignKey: 'school_id', sourceKey: 'id' });