import { IAccessPermission } from "../../../domain/auth/access.type";
import { Role } from "../../../domain/role/role";
import { RoleRepository } from "../../../domain/role/role.repository";
import { IRoleResponse } from "../../../interfaces/presenters/role.presenter";

export class RoleCrudUseCase {
    constructor(private readonly roleRespository: RoleRepository) {}
    async create(access: IAccessPermission, role: Role): Promise<IRoleResponse> {
        return await this.roleRespository.create(access, role);
    }
    async update(access: IAccessPermission, id: string, role: Role): Promise<IRoleResponse> {
        return await this.roleRespository.update(access, id, role);
    }
    async delete(access: IAccessPermission, id: string): Promise<void> {
        return await this.roleRespository.delete(access, id);
    }
    async findAll(access: IAccessPermission, name?: string): Promise<IRoleResponse[] | IRoleResponse> {
        return await this.roleRespository.findAll(access, name);
    }
}