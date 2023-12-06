import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";
import { DegreeModel } from "./degree.model";

export const BusinessUnitModel = database.define("business_units", {
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
    current_period: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    default_career: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    next_period: {
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
    degree_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: DegreeModel,
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
    },
});
BusinessUnitModel.hasOne(DegreeModel, { foreignKey: 'id', sourceKey: 'degree_id' });
UserModel.hasMany(BusinessUnitModel, { foreignKey: 'user_id', sourceKey: 'id' });