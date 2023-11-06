import { RoleError } from "../../../shared/errors";
import { Role } from "../../../shared/schemas";
import { UniqueID } from "../../../shared/utils";

export async function CreateRole(role: {name: string}) {
    try {
        const role_exists = await Role.findOne({where: {name: role.name}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role);
        if (role_exists) throw new RoleError(`El rol ${role.name} ya existe.`);
        await Role.create({
            id: UniqueID.generate(),
            name: role.name,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => {throw new RoleError('Ha ocurrido un error al tratar de crear el rol.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new RoleError(error.message);
        else throw new Error('Ha ocurrido un error al crear el rol.');
    }
}