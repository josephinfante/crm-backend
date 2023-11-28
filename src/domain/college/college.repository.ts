import { ICollegeResponse } from "../../interfaces/presenters/college.presenter";
import { IAccessPermission } from "../auth/access.type";
import { College } from "./college";

export interface CollegeRepository {
    create(access: IAccessPermission, college: College): Promise<ICollegeResponse>;
    update(access: IAccessPermission, id: string , college: College): Promise<ICollegeResponse>;
    delete(access: IAccessPermission, id: string): Promise<string>;
    findAll(access: IAccessPermission, college?: string): Promise<ICollegeResponse[]>;
}