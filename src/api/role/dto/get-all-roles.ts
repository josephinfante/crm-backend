import { RoleError } from "../../../shared/errors";
import { Role } from "../../../shared/schemas";

export async function GetAllRoles() {
    try {
        const roles = await Role.findAll().catch(_error => {throw new RoleError('Ha ocurrido un error al tratar de obtener los roles.')}).then(roles => roles);
        return roles;
    } catch (error) {
        if (error instanceof Error && error.message) throw new RoleError(error.message);
        else throw new Error('Ha ocurrido un error al obtener los roles.');
    }
}