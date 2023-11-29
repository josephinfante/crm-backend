import { IBusinessUnitResponse } from "../../interfaces/presenters/business-unit.presenter";
import { IAccessPermission } from "../auth/access.type";
import { BusinessUnit } from "./business-unit";

export interface BusinessUnitRepository {
    create(access: IAccessPermission, business_unit: BusinessUnit): Promise<IBusinessUnitResponse>;
    update(access: IAccessPermission, id: string, business_unit: BusinessUnit): Promise<IBusinessUnitResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findAll(access: IAccessPermission, business_unit?: string): Promise<IBusinessUnitResponse[]>;
}