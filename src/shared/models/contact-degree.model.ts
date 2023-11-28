import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { DegreeSpecificationModel } from "./degree-specification.model";
import { ContactModel } from "./contact.model";
import { CollegeModel } from "./college.model";
import { UserModel } from "./user.model";

export const ContactDegreeModel = database.define("contact_degrees", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    graduation_date: {
        type: DataTypes.DATE,
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
    degree_specification_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: DegreeSpecificationModel,
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
    college_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: CollegeModel,
            key: "id",
        },
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
UserModel.hasMany(ContactDegreeModel, { foreignKey: "user_id", sourceKey: "id" });
ContactDegreeModel.hasOne(DegreeSpecificationModel, { foreignKey: "id", sourceKey: "degree_specification_id" });
ContactDegreeModel.hasOne(CollegeModel, { foreignKey: "id", sourceKey: "college_id" });
ContactDegreeModel.hasOne(ContactModel, { foreignKey: "id", sourceKey: "contact_id" });
ContactModel.hasMany(ContactDegreeModel, { foreignKey: "contact_id", sourceKey: "id" });
