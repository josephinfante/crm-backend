import { IAccessPermission } from "../../../domain/auth/access.type";
import { Ethnicity } from "../../../domain/ethnicity/ethnicity";
import { EthnicityRepository } from "../../../domain/ethnicity/ethnicity.repository";
import { IEthnicityResponse } from "../../../interfaces/presenters/ethnicity.presenter";

export class EthnicityCrudUseCase {
    constructor(private readonly ethnicityRepository: EthnicityRepository) {}
    async create(access: IAccessPermission, ethnicity: Ethnicity): Promise<IEthnicityResponse> {
        return this.ethnicityRepository.create(access, ethnicity);
    }
    async update(access: IAccessPermission, id: string, ethnicity: Ethnicity): Promise<IEthnicityResponse> {
        return this.ethnicityRepository.update(access, id, ethnicity);
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        return this.ethnicityRepository.delete(access, id);
    }
    async findAll(access: IAccessPermission, ethnicity?: string): Promise<IEthnicityResponse[]> {
        return this.ethnicityRepository.findAll(access, ethnicity);
    }
}