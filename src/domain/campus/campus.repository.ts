import { ICampusResponse } from "../../interfaces/presenters/campus.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Campus } from "./campus";

export interface CampusRepository {
    create(access: IAccessPermission, campus: Campus): Promise<ICampusResponse>;
    update(access: IAccessPermission, id: string, campus: Campus): Promise<ICampusResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ICampusResponse[]>;
}