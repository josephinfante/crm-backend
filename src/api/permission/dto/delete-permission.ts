import { PermissionError } from "../../../shared/errors";
import { Permission } from "../../../shared/schemas";

export async function DeletePermission(id: string) {
    try {
        const permission = await Permission.findOne({ where: { id } }).catch(_error => { throw new PermissionError('Ha ocurrido un error al revisar el permiso.') }).then(permission => permission);
        if (!permission) throw new PermissionError(`El permiso con ID ${id} no existe.`);
        await permission.destroy().catch(_error => { throw new PermissionError('Ha ocurrido un error al tratar de eliminar el permiso.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al eliminar el permiso.');
    }
}