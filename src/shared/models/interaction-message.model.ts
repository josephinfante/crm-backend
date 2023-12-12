import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";
import { InteractionModel } from "./interaction.model";

export const InteractionMessageModel = database.define("interaction_messages", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    message_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cco: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Date.now()
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Date.now()
    },
    interaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: InteractionModel,
            key: "id"
        }
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: UserModel,
            key: "id"
        }
    },
});
InteractionMessageModel.hasOne(InteractionModel, { foreignKey: "id", sourceKey: "interaction_id" });
UserModel.hasMany(InteractionMessageModel, { foreignKey: "user_id", sourceKey: "id" });