import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { BusinessUnitModel } from "./business-unit.model";
import { UserModel } from "./user.model";

export const SchoolModel = database.define("schools", {
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
BusinessUnitModel.hasMany(SchoolModel, { foreignKey: 'business_unit_id', sourceKey: 'id' });
UserModel.hasMany(SchoolModel, { foreignKey: 'user_id', sourceKey: 'id' });