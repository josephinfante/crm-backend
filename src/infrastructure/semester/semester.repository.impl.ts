import { IAccessPermission } from "../../domain/auth/access.type";
import { Semester } from "../../domain/semester/semester";
import { SemesterRepository } from "../../domain/semester/semester.repository";
import { ISemesterResponse } from "../../interfaces/presenters/semester.presenter";
import semesterDao from "./semester.dao";

export class SemesterRepositoryImpl implements SemesterRepository {
    create(access: IAccessPermission, semester: Semester): Promise<ISemesterResponse> {
        return semesterDao.create(access, semester);
    }
    update(access: IAccessPermission, id: string, semester: Semester): Promise<ISemesterResponse> {
        return semesterDao.update(access, id, semester);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return semesterDao.delete(access, id);
    }
    findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ISemesterResponse[]> {
        return semesterDao.findByBusinessUnitId(access, business_unit_id);
    }
    findAll(access: IAccessPermission): Promise<ISemesterResponse[]> {
        return semesterDao.findAll(access);
    }
}