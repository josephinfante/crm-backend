import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { BusinessUnit } from "./business-unit.schema";

export const Semester = database.define("semesters", {
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
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    business_unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: BusinessUnit,
            key: 'id',
        },
    },
});