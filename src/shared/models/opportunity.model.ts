import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { ContactModel } from "./contact.model";
import { CareerModel } from "./career.model";
import { SemesterModel } from "./semester.model";
import { UserModel } from "./user.model";

export const OpportunityModel = database.define("opportunities", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
    contact_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ContactModel,
            key: 'id',
        },
    },
    career_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: CareerModel,
            key: 'id',
        },
    },
    semester_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: SemesterModel,
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: UserModel,
            key: 'id',
        },
    }
});
OpportunityModel.hasOne(ContactModel, { foreignKey: 'id', sourceKey: 'contact_id' });
OpportunityModel.hasOne(CareerModel, { foreignKey: 'id', sourceKey: 'career_id' });
OpportunityModel.hasOne(SemesterModel, { foreignKey: 'id', sourceKey: 'semester_id' });
UserModel.hasMany(OpportunityModel, { foreignKey: 'user_id', sourceKey: 'id' });