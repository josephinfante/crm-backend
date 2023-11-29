import { ICareerResponse } from "../../interfaces/presenters/career.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Career } from "./career";

export interface CareerRepository {
    create(access: IAccessPermission, career: Career): Promise<ICareerResponse>;
    update(access: IAccessPermission, id: string, career: Career): Promise<ICareerResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findBySchoolId(access: IAccessPermission, school_id: string): Promise<ICareerResponse[]>;
}