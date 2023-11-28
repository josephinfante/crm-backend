import { INationalityResponse } from "../../interfaces/presenters/nationality.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Nationality } from "./nationality";

export interface NationalityRepository {
    create(access: IAccessPermission, nationality: Nationality): Promise<INationalityResponse>;
    update(access: IAccessPermission, id: string, nationality: Nationality): Promise<INationalityResponse>;
    delete(access: IAccessPermission, id: string): Promise<string>;
    findAll(access: IAccessPermission, nationality?: string): Promise<INationalityResponse[]>;
}