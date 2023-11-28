import { IAccessPermission } from "../../domain/auth/access.type";
import { College } from "../../domain/college/college";
import { CollegeRepository } from "../../domain/college/college.repository";
import { ICollegeResponse } from "../../interfaces/presenters/college.presenter";
import collegeDao from "./college.dao";

export class CollegeRepositoryImpl implements CollegeRepository {
    create(access: IAccessPermission, college: College): Promise<ICollegeResponse> {
        return collegeDao.create(access, college);
    }
    update(access: IAccessPermission, id: string, college: College): Promise<ICollegeResponse> {
        return collegeDao.update(access, id, college);
    }
    delete(access: IAccessPermission, id: string): Promise<string> {
        return collegeDao.delete(access, id);
    }
    findAll(access: IAccessPermission, college?: string): Promise<ICollegeResponse[]> {
        return collegeDao.findAll(access, college);
    }
}