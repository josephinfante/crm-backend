import { ISemesterResponse } from "../../interfaces/presenters/semester.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Semester } from "./semester";

export interface SemesterRepository {
    create(access: IAccessPermission, semester: Semester): Promise<ISemesterResponse>;
    update(access: IAccessPermission, id: string, semester: Semester): Promise<ISemesterResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ISemesterResponse[]>;
}