import { IAccessPermission } from "../../domain/auth/access.type";
import { Career } from "../../domain/career/career";
import { CareerRepository } from "../../domain/career/career.repository";
import { ICareerResponse } from "../../interfaces/presenters/career.presenter";
import careerDao from "./career.dao";

export class CareerRepositoryImpl implements CareerRepository {
    create(access: IAccessPermission, career: Career): Promise<ICareerResponse> {
        return careerDao.create(access, career);
    }
    update(access: IAccessPermission, id: string, career: Career): Promise<ICareerResponse> {
        return careerDao.update(access, id, career);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return careerDao.delete(access, id);
    }
    findBySchoolId(access: IAccessPermission, school_id: string): Promise<ICareerResponse[]> {
        return careerDao.findBySchoolId(access, school_id);
    }
}