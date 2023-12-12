import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";
import { CollegeModel } from "./college.model";
import { DegreeSpecificationModel } from "./degree-specification.model";
import { EthnicityModel } from "./ethnicity.model";
import { NationalityModel } from "./nationality.model";
import { CountryModel } from "./country.model";
import { DistrictModel } from "./district.model";

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
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.STRING,
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
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    graduation_date: {
        type: DataTypes.BIGINT,
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
        type: DataTypes.STRING,
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
    accept_policies: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    accept_marketing: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
        references: {
            model: CollegeModel,
            key: "id",
        },
    },
    degree_specification_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: DegreeSpecificationModel,
            key: "id",
        },
    },
    ethnicity_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: EthnicityModel,
            key: "id",
        },
    },
    nationality_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: NationalityModel,
            key: "id",
        },
    },
    country_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: CountryModel,
            key: "id",
        },
    },
    district_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: DistrictModel,
            key: "id",
        }
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: UserModel,
            key: "id",
        },
    },
});
ContactModel.hasOne(CollegeModel, { foreignKey: "id", sourceKey: "college_id" });
ContactModel.hasOne(DegreeSpecificationModel, { foreignKey: "id", sourceKey: "degree_specification_id" });
ContactModel.hasOne(EthnicityModel, { foreignKey: "id", sourceKey: "ethnicity_id" });
ContactModel.hasOne(NationalityModel, { foreignKey: "id", sourceKey: "nationality_id" });
ContactModel.hasOne(CountryModel, { foreignKey: "id", sourceKey: "country_id" });
ContactModel.hasOne(DistrictModel, { foreignKey: "id", sourceKey: "district_id" });
UserModel.hasMany(ContactModel, { foreignKey: "user_id", sourceKey: "id" });