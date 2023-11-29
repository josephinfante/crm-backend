import { IAccessPermission } from "../../domain/auth/access.type";
import { BusinessUnit } from "../../domain/business-unit/business-unit";
import { BusinessUnitRepository } from "../../domain/business-unit/business-unit.repository";
import { IBusinessUnitResponse } from "../../interfaces/presenters/business-unit.presenter";
import businessUnitDao from "./business-unit.dao";

export class BusinessUnitRepositoryImpl implements BusinessUnitRepository {
    create(access: IAccessPermission, business_unit: BusinessUnit): Promise<IBusinessUnitResponse> {
        return businessUnitDao.create(access, business_unit);
    }
    update(access: IAccessPermission, id: string, business_unit: BusinessUnit): Promise<IBusinessUnitResponse> {
        return businessUnitDao.update(access, id, business_unit);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return businessUnitDao.delete(access, id);
    }
    findAll(access: IAccessPermission, business_unit?: string | undefined): Promise<IBusinessUnitResponse[]> {
        return businessUnitDao.findAll(access, business_unit);
    }
}