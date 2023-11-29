import { ISchoolResponse } from "../../interfaces/presenters/school.presenter";
import { IAccessPermission } from "../auth/access.type";
import { School } from "./school";

export interface SchoolRepository {
    create(access: IAccessPermission, school: School): Promise<ISchoolResponse>;
    update(access: IAccessPermission, id: string, school: School): Promise<ISchoolResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ISchoolResponse[]>;
}