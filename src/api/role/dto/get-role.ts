import { RoleError } from "../../../shared/errors";
import { Role } from "../../../shared/schemas";
import { GetPermissionsByRoleId } from "../../permission/dto/get-permissions-by-role-id";
import { GetPagesByRoleId } from "../../page/dto/get-pages-by-role-id";

export async function GetRole(id: string) {
    try {
        const role = await Role.findOne({where: {id: id}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role);
        if (!role) throw new RoleError(`El rol con ID ${id} no existe.`);
        const permissions = await GetPermissionsByRoleId(id);
        const pages = await GetPagesByRoleId(id);
        return {
            id: role.dataValues.id,
            name: role.dataValues.name,
            pages: pages,
            permission: permissions,
            createdAt: role.dataValues.createdAt,
            updatedAt: role.dataValues.updatedAt,
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new RoleError(error.message);
        else throw new Error('Ha ocurrido un error al obtener el rol.');
    }
}