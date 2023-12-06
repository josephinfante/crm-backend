import { DataTypes } from "sequelize";
import { database } from "../connections/database/mysql";
import { UserModel } from "./user.model";
import { SalePhaseModel } from "./sale-phase.model";
import { BusinessUnitModel } from "./business-unit.model";

export const TrackingClassificationModel = database.define("tracking_classifications", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
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
        allowNull: false,
        references: {
            model: BusinessUnitModel,
            key: "id",
        },
    },
    sale_phase_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: SalePhaseModel,
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
    }
});
TrackingClassificationModel.hasOne(BusinessUnitModel, { foreignKey: 'id', sourceKey: 'business_unit_id' });
TrackingClassificationModel.hasOne(SalePhaseModel, { foreignKey: 'id', sourceKey: 'sale_phase_id' });
UserModel.hasMany(TrackingClassificationModel, { foreignKey: 'user_id', sourceKey: 'id' });