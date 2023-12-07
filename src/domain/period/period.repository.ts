import { IPeriodResponse } from "../../interfaces/presenters/period.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Period } from "./period";

export interface PeriodRepository {
    create(access: IAccessPermission, period: Period): Promise<IPeriodResponse>;
    update(access: IAccessPermission, id: string, period: Period): Promise<IPeriodResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<IPeriodResponse[]>;
    findAll(access: IAccessPermission): Promise<IPeriodResponse[]>;
}