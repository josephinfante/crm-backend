import { IAccessPermission } from "../../domain/auth/access.type";
import { Degree } from "../../domain/degree/degree";
import { DegreeRepository } from "../../domain/degree/degree.repository";
import { IDegreeResponse } from "../../interfaces/presenters/degree.presenter";
import degreeDao from "./degree.dao";

export class DegreeRepositoryImpl implements DegreeRepository {
    create(access: IAccessPermission, degree: Degree): Promise<IDegreeResponse> {
        return degreeDao.create(access, degree);
    }
    update(access: IAccessPermission, id: string, degree: Degree): Promise<IDegreeResponse> {
        return degreeDao.update(access, id, degree);
    }
    delete(access: IAccessPermission, id: string): Promise<string> {
        return degreeDao.delete(access, id);
    }
    findById(access: IAccessPermission, id: string): Promise<IDegreeResponse> {
        return degreeDao.findById(access, id);
    }
    findAll(access: IAccessPermission, degree?: string): Promise<IDegreeResponse[]> {
        return degreeDao.findAll(access, degree);
    }
}