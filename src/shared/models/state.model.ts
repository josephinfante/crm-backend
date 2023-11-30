import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { CountryModel } from "./country.model";
import { UserModel } from "./user.model";

export const StateModel = database.define("states", {
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
    country_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: CountryModel,
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
CountryModel.hasMany(StateModel, { foreignKey: 'country_id', sourceKey: 'id' });
UserModel.hasMany(StateModel, { foreignKey: 'user_id', sourceKey: 'id' });