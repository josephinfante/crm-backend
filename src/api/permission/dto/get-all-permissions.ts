import { PermissionError } from "../../../shared/errors";
import { Component, Permission, Role } from "../../../shared/schemas";

export async function GetAllPermissions() {
    try {
        const permissions = await Permission.findAll({
            include: [{ model: Role, attributes: ['name'] }, { model: Component, attributes: ['name'] }],
            raw: true,
        }).catch(_error => { throw new PermissionError('Ha ocurrido un error al revisar el permiso.') }).then(permissions => permissions);
        const reshapedPermissions = permissions.map((permission: any) => ({
            id: permission.id,
            component: permission['component.name'],
            role: permission['role.name'],
            create: permission.create,
            read: permission.read,
            update: permission.update,
            delete: permission.delete,
            updatedAt: permission.updatedAt,
            createdAt: permission.createdAt,
        }));
        return reshapedPermissions;
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al obtener los permisos.');
    }
}