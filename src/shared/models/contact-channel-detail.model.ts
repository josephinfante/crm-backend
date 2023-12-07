import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { ContactChannelModel } from "./contact-channel.model";
import { UserModel } from "./user.model";

export const ContactChannelDetailModel = database.define("contact_channel_details", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
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
    contact_channel_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ContactChannelModel,
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
ContactChannelDetailModel.hasOne(ContactChannelModel, { foreignKey: "id", sourceKey: "contact_channel_id" });
UserModel.hasMany(ContactChannelDetailModel, { foreignKey: "user_id", sourceKey: "id" });