import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { School } from "./school.schema";

export const Career = database.define("careers", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    school_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: School,
            key: 'id',
        },
    },
});
Career.hasOne(School, {foreignKey: 'id', sourceKey: 'school_id'});