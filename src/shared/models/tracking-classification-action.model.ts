import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { TrackingClassificationModel } from "./tracking-classification.model";
import { UserModel } from "./user.model";

export const TrackingClassificationActionModel = database.define("tracking_classification_actions", {
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
    tracking_classification_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: TrackingClassificationModel,
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
    },
});
TrackingClassificationActionModel.hasOne(TrackingClassificationModel, { foreignKey: "id", sourceKey: "tracking_classification_id" });
UserModel.hasMany(TrackingClassificationActionModel, { foreignKey: "user_id", sourceKey: "id" });