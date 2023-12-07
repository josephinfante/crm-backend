import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";

export const ContactChannelModel = database.define("contact_channels", {
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
    automatic_assignment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    manual_assignment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    send_email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    send_sms: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    send_note: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    expire_days: {
        type: DataTypes.INTEGER,
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
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: UserModel,
            key: "id",
        }
    }
});
UserModel.hasMany(ContactChannelModel, { foreignKey: "user_id", sourceKey: "id" });