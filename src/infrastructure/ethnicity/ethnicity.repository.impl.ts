import { IAccessPermission } from "../../domain/auth/access.type";
import { Ethnicity } from "../../domain/ethnicity/ethnicity";
import { EthnicityRepository } from "../../domain/ethnicity/ethnicity.repository";
import { IEthnicityResponse } from "../../interfaces/presenters/ethnicity.presenter";
import ethnicityDao from "./ethnicity.dao";

export class EthnicityRepositoryImpl implements EthnicityRepository {
    create(access: IAccessPermission, ethnicity: Ethnicity): Promise<IEthnicityResponse> {
        return ethnicityDao.create(access, ethnicity);
    }
    update(access: IAccessPermission, id: string, ethnicity: Ethnicity): Promise<IEthnicityResponse> {
        return ethnicityDao.update(access, id, ethnicity);
    }
    delete(access: IAccessPermission, id: string): Promise<string> {
        return ethnicityDao.delete(access, id);
    }
    findAll(access: IAccessPermission, ethnicity?: string): Promise<IEthnicityResponse[]> {
        return ethnicityDao.findAll(access, ethnicity)
    }
}