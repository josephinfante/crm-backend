import { RoleError } from "../../../shared/errors";
import { Role } from "../../../shared/schemas";

export async function GetRole(id: string) {
    try {
        const role = await Role.findOne({where: {id: id}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role);
        if (!role) throw new RoleError(`El rol con ID ${id} no existe.`);
        return role;
    } catch (error) {
        if (error instanceof Error && error.message) throw new RoleError(error.message);
        else throw new Error('Ha ocurrido un error al obtener el rol.');
    }
}