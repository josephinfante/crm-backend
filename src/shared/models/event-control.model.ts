import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";
import { EventModel } from "./event.model";
import { ContactModel } from "./contact.model";
import { OpportunityModel } from "./opportunity.model";

export const EventControlModel = database.define("event_controls", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    attended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    will_apply: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    qr_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    event_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_event_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sent_sms: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    sent_email: {
        type: DataTypes.BOOLEAN,
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
    event_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: EventModel,
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
    opportunity_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: OpportunityModel,
            key: "id",
        },
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
EventControlModel.hasOne(EventModel, { foreignKey: "id", sourceKey: "event_id" });
EventControlModel.hasOne(ContactModel, { foreignKey: "id", sourceKey: "contact_id" });
EventControlModel.hasOne(OpportunityModel, { foreignKey: "id", sourceKey: "opportunity_id" });
UserModel.hasMany(EventControlModel, { foreignKey: "user_id", sourceKey: "id" });