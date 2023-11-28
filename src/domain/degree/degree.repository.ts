import { IDegreeResponse } from "../../interfaces/presenters/degree.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Degree } from "./degree";

export interface DegreeRepository {
    create(access: IAccessPermission, degree: Degree): Promise<IDegreeResponse>;
    update(access: IAccessPermission, id: string, degree: Degree): Promise<IDegreeResponse>;
    delete(access: IAccessPermission, id: string): Promise<string>;
    findById(access: IAccessPermission, id: string): Promise<IDegreeResponse>;
    findAll(access: IAccessPermission, degree?: string): Promise<IDegreeResponse[]>;
}