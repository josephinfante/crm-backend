import { PermissionError } from "../../../shared/errors";
import { Permission } from "../../../shared/schemas";
import { UniqueID } from "../../../shared/utils";
import { PermissionCreateInterface } from "../permission.type";

export async function CreatePermission(permission : PermissionCreateInterface) {
    try {
        await Permission.create({
            id: UniqueID.generate(),
            create: permission.create,
            read: permission.read,
            update: permission.update,
            delete: permission.delete,
            createdAt: new Date(),
            updatedAt: new Date(),
            component_id: permission.component_id,
            role_id: permission.role_id,
        }).catch(_error => { throw new PermissionError('Ha ocurrido un error al tratar de crear el permiso.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al crear el permiso.');
    }
}