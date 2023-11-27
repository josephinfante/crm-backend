import { IAccessPermission } from "../../domain/auth/access.type";
import { Role } from "../../domain/role/role";
import { RoleRepository } from "../../domain/role/role.repository";
import { IRoleResponse } from "../../interfaces/presenters/role.presenter";
import roleDao from "./role.dao";

export class RoleRepositoryImpl implements RoleRepository {
    create(access: IAccessPermission, role: Role): Promise<IRoleResponse> {
        return roleDao.create(access, role);
    }
    update(access: IAccessPermission, id: string, role: Role): Promise<IRoleResponse> {
        return roleDao.update(access, id, role);
    }
    delete(access: IAccessPermission, id: string): Promise<void> {
        return roleDao.delete(access, id);
    }
    findAll(access: IAccessPermission, name?: string | undefined): Promise<IRoleResponse[] | IRoleResponse> {
        return roleDao.findAll(access, name);
    }
}