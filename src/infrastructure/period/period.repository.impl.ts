import { IAccessPermission } from "../../domain/auth/access.type";
import { Period } from "../../domain/period/period";
import { PeriodRepository } from "../../domain/period/period.repository";
import { IPeriodResponse } from "../../interfaces/presenters/period.presenter";
import periodDao from "./period.dao";

export class PeriodRepositoryImpl implements PeriodRepository {
    create(access: IAccessPermission, period: Period): Promise<IPeriodResponse> {
        return periodDao.create(access, period);
    }
    update(access: IAccessPermission, id: string, period: Period): Promise<IPeriodResponse> {
        return periodDao.update(access, id, period);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return periodDao.delete(access, id);
    }
    findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<IPeriodResponse[]> {
        return periodDao.findByBusinessUnitId(access, business_unit_id);
    }
    findAll(access: IAccessPermission): Promise<IPeriodResponse[]> {
        return periodDao.findAll(access);
    }
}