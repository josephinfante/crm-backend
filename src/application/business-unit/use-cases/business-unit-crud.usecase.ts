import { IAccessPermission } from "../../../domain/auth/access.type";
import { BusinessUnit } from "../../../domain/business-unit/business-unit";
import { BusinessUnitRepository } from "../../../domain/business-unit/business-unit.repository";
import { IBusinessUnitResponse } from "../../../interfaces/presenters/business-unit.presenter";

export class BusinessUnitCrudUseCase {
    constructor(private readonly businessUnitRepository: BusinessUnitRepository) {}
    async create(access: IAccessPermission, business_unit: BusinessUnit): Promise<IBusinessUnitResponse> {
        return await this.businessUnitRepository.create(access, business_unit)
    }
    async update(access: IAccessPermission, id: string, business_unit: BusinessUnit): Promise<IBusinessUnitResponse> {
        return await this.businessUnitRepository.update(access, id, business_unit)
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.businessUnitRepository.delete(access, id)
    }
    async findAll(access: IAccessPermission, business_unit?: string): Promise<IBusinessUnitResponse[]> {
        return await this.businessUnitRepository.findAll(access, business_unit)
    }
}