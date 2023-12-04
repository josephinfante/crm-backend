import { IAccessPermission } from "../../domain/auth/access.type";
import { School } from "../../domain/school/school";
import { SchoolRepository } from "../../domain/school/school.repository";
import { ISchoolResponse } from "../../interfaces/presenters/school.presenter";
import schoolDao from "./school.dao";

export class SchoolRepositoryImpl implements SchoolRepository {
    create(access: IAccessPermission, school: School): Promise<ISchoolResponse> {
        return schoolDao.create(access, school);
    }
    update(access: IAccessPermission, id: string, school: School): Promise<ISchoolResponse> {
        return schoolDao.update(access, id, school);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return schoolDao.delete(access, id);
    }
    findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ISchoolResponse[]> {
        return schoolDao.findByBusinessUnitId(access, business_unit_id);
    }
    findAll(access: IAccessPermission): Promise<ISchoolResponse[]> {
        return schoolDao.findAll(access);
    }
}