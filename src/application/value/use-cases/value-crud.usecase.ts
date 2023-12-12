import { IAccessPermission } from "../../../domain/auth/access.type";
import { Value } from "../../../domain/value/value";
import { ValueRepository } from "../../../domain/value/value.repository";
import { IValueResponse } from "../../../interfaces/presenters/value.presenter";

export class ValueCrudUseCase {
    constructor(private readonly valueRepository: ValueRepository) { }
    async create(access: IAccessPermission, contact_relative: Value): Promise<IValueResponse> {
        return await this.valueRepository.create(access, contact_relative);
    }
    async update(access: IAccessPermission, id: string, contact_relative: Value): Promise<IValueResponse> {
        return await this.valueRepository.update(access, id, contact_relative);
    }
    async delete(access: IAccessPermission, id: string): Promise<void | string> {
        return await this.valueRepository.delete(access, id);
    }
    async findById(access: IAccessPermission, id: string): Promise<IValueResponse> {
        return await this.valueRepository.findById(access, id);
    }
    async findAll(access: IAccessPermission): Promise<IValueResponse[]> {
        return await this.valueRepository.findAll(access);
    }
}