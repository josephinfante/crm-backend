import { RoleError } from "../../../shared/errors";
import { Role } from "../../../shared/schemas";
import { GetPagesByRoleId } from "../../page/dto/get-pages-by-role-id";
import { GetPermissionsByRoleId } from "../../permission/dto/get-permissions-by-role-id";

export async function GetAllRoles() {
    try {
        const roles = await Role.findAll().catch(_error => {throw new RoleError('Ha ocurrido un error al tratar de obtener los roles.')}).then(roles => roles);
        const reshapedRoles = [];
        for (const role of roles) {
            const permissions = await GetPermissionsByRoleId(role.dataValues.id);
            const pages = await GetPagesByRoleId(role.dataValues.id);
            reshapedRoles.push({
                id: role.dataValues.id,
                name: role.dataValues.name,
                pages: pages,
                permission: permissions,
                createdAt: role.dataValues.createdAt,
                updatedAt: role.dataValues.updatedAt,
            });
        }
        return reshapedRoles;
    } catch (error) {
        if (error instanceof Error && error.message) throw new RoleError(error.message);
        else throw new Error('Ha ocurrido un error al obtener los roles.');
    }
}