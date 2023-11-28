import { IEthnicityResponse } from "../../interfaces/presenters/ethnicity.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Ethnicity } from "./ethnicity";

export interface EthnicityRepository {
    create(access: IAccessPermission, ethnicity: Ethnicity): Promise<IEthnicityResponse>;
    update(access: IAccessPermission, id: string, ethnicity: Ethnicity): Promise<IEthnicityResponse>;
    delete(access: IAccessPermission, id: string): Promise<string>;
    findAll(access: IAccessPermission, ethnicity?: string): Promise<IEthnicityResponse[]>;
}