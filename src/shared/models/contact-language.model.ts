import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { LanguageModel } from "./language.model";
import { ContactModel } from "./contact.model";
import { UserModel } from "./user.model";

export const ContactLanguageModel = database.define("contact_languages", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    native: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    read: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    speak: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    listen: {
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
    language_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: LanguageModel,
            key: "id",
        },
    },
    contact_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ContactModel,
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
ContactLanguageModel.hasOne(LanguageModel, { foreignKey: "id", sourceKey: "language_id" });
ContactLanguageModel.hasOne(ContactModel, { foreignKey: "id", sourceKey: "contact_id" });
UserModel.hasMany(ContactLanguageModel, { foreignKey: "user_id", sourceKey: "id" });