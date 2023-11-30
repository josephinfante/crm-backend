import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { CityModel } from "./city.model";
import { UserModel } from "./user.model";

export const DistrictModel = database.define("districts", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
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
    city_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: CityModel,
            key: "id",
        },
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: UserModel,
            key: "id",
        },
    }
});
CityModel.hasMany(DistrictModel, { foreignKey: 'city_id', sourceKey: 'id' });
UserModel.hasMany(DistrictModel, { foreignKey: 'user_id', sourceKey: 'id' });