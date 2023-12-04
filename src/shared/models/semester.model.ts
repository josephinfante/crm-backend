import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { BusinessUnitModel } from "./business-unit.model";
import { UserModel } from "./user.model";

export const SemesterModel = database.define("semesters", {
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
    business_unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: BusinessUnitModel,
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
SemesterModel.hasOne(BusinessUnitModel, { foreignKey: 'id', sourceKey: 'business_unit_id' });
UserModel.hasMany(SemesterModel, { foreignKey: 'user_id', sourceKey: 'id' });