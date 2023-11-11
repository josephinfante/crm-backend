import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { Contact } from "./contact.schema";
import { Career } from "./career.schema";
import { Semester } from "./semester.schema";

export const Opportunity = database.define("opportunities", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    contact_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Contact,
            key: 'id',
        },
    },
    career_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Career,
            key: 'id',
        },
    },
    semester_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Semester,
            key: 'id',
        },
    },
});
Opportunity.hasOne(Contact, {foreignKey: 'id', sourceKey: 'contact_id'});
Opportunity.hasOne(Career, {foreignKey: 'id', sourceKey: 'career_id'});
Opportunity.hasOne(Semester, {foreignKey: 'id', sourceKey: 'semester_id'});