import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { ContactModel } from "./contact.model";
import { UserModel } from "./user.model";

export const ContactRelativeModel = database.define("contact_relatives", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    relationship: {
        type: DataTypes.STRING,
        allowNull: true,
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
    contact_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ContactModel,
            key: "id",
        },
    },
    relative_id: {
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
ContactRelativeModel.hasOne(ContactModel, { as: 'contact', foreignKey: "id", sourceKey: "contact_id" });
ContactRelativeModel.hasOne(ContactModel, { as: 'relative', foreignKey: "id", sourceKey: "relative_id" });
UserModel.hasMany(ContactRelativeModel, { foreignKey: "user_id", sourceKey: "id" });