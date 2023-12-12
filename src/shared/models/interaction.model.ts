import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";
import { OpportunityModel } from "./opportunity.model";
import { CollegeModel } from "./college.model";
import { ContactChannelModel } from "./contact-channel.model";

export const InteractionModel = database.define("interactions", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone : {
        type: DataTypes.STRING,
        allowNull: true
    },
    contact_channel_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    integration_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    start_interaction_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now()
    },
    start_hold_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now()
    },
    end_hold_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now()
    },
    end_interaction_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now()
    },
    tracking_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now()
    },
    next_interaction_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now()
    },
    viewed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    comment: {
        type: DataTypes.TEXT,
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
    opportunity_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: OpportunityModel,
            key: "id"
        }
    },
    college_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: CollegeModel,
            key: "id"
        }
    },
    contact_channel_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: ContactChannelModel,
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
InteractionModel.hasOne(OpportunityModel, { foreignKey: "id", sourceKey: "opportunity_id" });
InteractionModel.hasOne(CollegeModel, { foreignKey: "id", sourceKey: "college_id" });
InteractionModel.hasOne(ContactChannelModel, { foreignKey: "id", sourceKey: "contact_channel_id" });
UserModel.hasMany(InteractionModel, { foreignKey: "user_id", sourceKey: "id" });