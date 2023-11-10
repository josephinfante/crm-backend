import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";

export const Contact = database.define("contacts", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name_1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name_2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    facebook_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instagram_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});
