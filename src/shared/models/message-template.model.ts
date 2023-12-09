import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { BusinessUnitModel } from "./business-unit.model";
import { ContactChannelModel } from "./contact-channel.model";
import { SalePhaseModel } from "./sale-phase.model";
import { CampusModel } from './campus.model';
import { CareerModel } from './career.model';
import { EventModel } from './event.model';
import { UserModel } from "./user.model";

export const MessageTemplateModel = database.define("message_templates", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
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
    business_unit_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: BusinessUnitModel,
            key: 'id',
        },
    },
    contact_channel_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: ContactChannelModel,
            key: 'id'
        }
    },
    sale_phase_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: SalePhaseModel,
            key: 'id'
        }
    },
    campus_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: CampusModel,
            key: 'id'
        }
    },
    career_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: CareerModel,
            key: 'id'
        }
    },
    event_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: EventModel,
            key: 'id'
        }
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
BusinessUnitModel.hasMany(MessageTemplateModel, { foreignKey: 'business_unit_id', sourceKey: 'id' });
ContactChannelModel.hasMany(MessageTemplateModel, { foreignKey: 'contact_channel_id', sourceKey: 'id' });
SalePhaseModel.hasMany(MessageTemplateModel, { foreignKey: 'sale_phase_id', sourceKey: 'id' });
CampusModel.hasMany(MessageTemplateModel, { foreignKey: 'campus_id', sourceKey: 'id' });
CareerModel.hasMany(MessageTemplateModel, { foreignKey: 'career_id', sourceKey: 'id' });
EventModel.hasMany(MessageTemplateModel, { foreignKey: 'event_id', sourceKey: 'id' });
UserModel.hasMany(MessageTemplateModel, { foreignKey: 'user_id', sourceKey: 'id' });