import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";
import { CollegeModel } from "./college.model";
import { CampusModel } from "./campus.model";

export const EventModel = database.define("event", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    campaign_start_date: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    waiting_time: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    send_sms: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    send_email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    registration_from_expected: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    registration_from_delivered: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    registration_from_completed: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    registration_from_incompleted: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    virtual: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    pre_inscription_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_event_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    meeting_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    survery_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    send_survey: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    sent_pre_inscription: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    inscription_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: Date.now()
    },
    campus_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: CampusModel,
            key: "id"
        }
    },
    college_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: CollegeModel,
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
EventModel.hasOne(CollegeModel, { foreignKey: "id", sourceKey: "college_id" });
UserModel.hasMany(EventModel, { foreignKey: "user_id", sourceKey: "id" });