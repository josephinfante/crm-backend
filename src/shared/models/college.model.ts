import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";

export const CollegeModel = database.define("colleges", {
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
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    class: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    board: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_competitor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
        references: {
            model: UserModel,
            key: "id",
        },
    },
});
UserModel.hasMany(CollegeModel, { foreignKey: "user_id", sourceKey: "id" });