import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { DegreeModel } from "./degree.model";
import { UserModel } from "./user.model";

export const DegreeSpecificationModel = database.define("degree_specifications", {
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
    degree_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: DegreeModel,
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
DegreeSpecificationModel.hasOne(DegreeModel, { foreignKey: "id", sourceKey: "degree_id" });
UserModel.hasMany(DegreeSpecificationModel, { foreignKey: "user_id", sourceKey: "id" });