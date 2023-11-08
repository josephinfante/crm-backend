import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { School } from "./school.schema";
import { Campus } from "./campus.schema";
import { Semester } from "./semester.schema";

export const BusinessUnit = database.define("business_units", {
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
});
BusinessUnit.hasMany(School, { foreignKey: 'business_unit_id', sourceKey: 'id', as: 'schools' });
BusinessUnit.hasMany(Campus, { foreignKey: 'business_unit_id', sourceKey: 'id', as: 'campuses' });
BusinessUnit.hasMany(Semester, { foreignKey: 'business_unit_id', sourceKey: 'id', as: 'semesters' });