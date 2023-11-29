import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { StateModel } from "./state.model";
import { UserModel } from "./user.model";

export const CityModel = database.define("cities", {
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
    state_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: StateModel,
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
StateModel.hasMany(CityModel, { foreignKey: 'state_id', sourceKey: 'id' });
UserModel.hasMany(CityModel, { foreignKey: 'user_id', sourceKey: 'id' });