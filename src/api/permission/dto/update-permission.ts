import { PermissionError } from "../../../shared/errors";
import { Permission } from "../../../shared/schemas";
import { PermissionUpdateInterface } from "../permission.type";

export async function UpdatePermission(data: PermissionUpdateInterface){
    try {
        const permission_exist = await Permission.findOne({where: {component_id: data.component_id, role_id: data.role_id}}).catch(_error => {throw new PermissionError('Ha ocurrido un error al revisar el permiso.')}).then(permission => permission);
        if (permission_exist) {
            permission_exist.set({
                create: data.create,
                read: data.read,
                update: data.update,
                delete: data.delete,
                updatedAt: new Date(),
            });
            await permission_exist.save().catch(_error => {throw new PermissionError('Ha ocurrido un error al tratar de actualizar el permiso.')});
        }
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar el permiso.');
    }
}