import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";

export const PageModel = database.define("pages", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    internal_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    external_url: {
        type: DataTypes.STRING,
        allowNull: true,
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
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        references: {
            model: UserModel,
            key: "id",
        },
    }
});
UserModel.hasMany(PageModel, { foreignKey: "id", sourceKey: "user_id" });