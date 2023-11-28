import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";

export const ContactModel = database.define("contacts", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name_1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name_2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mobile_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    document_type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "DNI",
    },
    document_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    code : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email_1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email_2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    civil_status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "soltero/a",
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    graduation_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    whatsapp_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    facebook_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instagram_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zipcode: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address_reference: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    native_language: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    accept_policies: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    accept_marketing: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now(),
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now(),
    },
    college_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    degree_specification_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ethnicity_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nationality_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    district_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});