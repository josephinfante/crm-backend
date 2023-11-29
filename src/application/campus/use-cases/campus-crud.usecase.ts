import { IAccessPermission } from "../../../domain/auth/access.type";
import { Campus } from "../../../domain/campus/campus";
import { CampusRepository } from "../../../domain/campus/campus.repository";
import { ICampusResponse } from "../../../interfaces/presenters/campus.presenter";

export class CampusCrudUseCase {
    constructor(private readonly campusRepository: CampusRepository) { }
    async create(access: IAccessPermission, campus: Campus): Promise<ICampusResponse> {
        return this.campusRepository.create(access, campus);
    }
    async update(access: IAccessPermission, id: string, campus: Campus): Promise<ICampusResponse> {
        return this.campusRepository.update(access, id, campus);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return this.campusRepository.delete(access, id);
    }
    async findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ICampusResponse[]> {
        return this.campusRepository.findByBusinessUnitId(access, business_unit_id);
    }
}