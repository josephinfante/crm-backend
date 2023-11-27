import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { RoleModel } from "./role.model";
import { PageModel } from "./page.model";
import { UserModel } from "./user.model";

export const MenuModel = database.define("menus", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
    role_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        references: {
            model: RoleModel,
            key: "id",
        },
    },
    page_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        references: {
            model: PageModel,
            key: "id",
        },
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        references: {
            model: UserModel,
            key: "id",
        },
    },
});
MenuModel.hasOne(RoleModel, { foreignKey: "id", sourceKey: "role_id" });
MenuModel.hasOne(PageModel, { foreignKey: "id", sourceKey: "page_id" });
UserModel.hasMany(MenuModel, { foreignKey: "id", sourceKey: "user_id" });