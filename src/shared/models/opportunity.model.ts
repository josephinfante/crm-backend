import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { ContactModel } from "./contact.model";
import { CareerModel } from "./career.model";
import { PeriodModel } from "./period.model";
import { UserModel } from "./user.model";
import { CampusModel } from "./campus.model";
import { BusinessUnitModel } from "./business-unit.model";
import { SalePhaseModel } from "./sale-phase.model";
import { ContactChannelModel } from "./contact-channel.model";
import { CollegeModel } from "./college.model";

export const OpportunityModel = database.define("opportunities", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    reserved_enrollment: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    reserved_period: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    postulation_type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postulation_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    tentative_enrollment_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    termination_motive: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    migration_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_interaction: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    interest_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    registration_form_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    purpose_full_interaction: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
        allowNull: true,
        references: {
            model: CareerModel,
            key: 'id',
        },
    },
    period_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: PeriodModel,
            key: 'id',
        },
    },
    campus_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: CampusModel,
            key: 'id',
        },
    },
    business_unit_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: BusinessUnitModel,
            key: 'id',
        },
    },
    sale_phase_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: SalePhaseModel,
            key: 'id',
        },
    },
    contact_channel_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: ContactChannelModel,
            key: 'id',
        },
    },
    competitor_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: CollegeModel,
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
OpportunityModel.hasOne(PeriodModel, { foreignKey: 'id', sourceKey: 'period_id' });
OpportunityModel.hasOne(CampusModel, { foreignKey: 'id', sourceKey: 'campus_id' });
OpportunityModel.hasOne(BusinessUnitModel, { foreignKey: 'id', sourceKey: 'business_unit_id' });
OpportunityModel.hasOne(SalePhaseModel, { foreignKey: 'id', sourceKey: 'sale_phase_id' });
OpportunityModel.hasOne(ContactChannelModel, { foreignKey: 'id', sourceKey: 'contact_channel_id' });
OpportunityModel.hasOne(CollegeModel, { foreignKey: 'id', sourceKey: 'competitor_id', as : 'competitor' });
UserModel.hasMany(OpportunityModel, { foreignKey: 'user_id', sourceKey: 'id' });