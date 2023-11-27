import { IRoleResponse } from "../../interfaces/presenters/role.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Role } from "./role";

export interface RoleRepository {
    create(access: IAccessPermission, role: Role): Promise<IRoleResponse>;
    update(access: IAccessPermission, id: string, role: Role): Promise<IRoleResponse>;
    delete(access: IAccessPermission, id: string): Promise<void>;
    findAll(access: IAccessPermission, name?: string): Promise<IRoleResponse[] | IRoleResponse>;
}