import { PermissionError } from "../../../shared/errors";
import { Component, Permission } from "../../../shared/schemas";

export async function GetPermissionsByRoleId(role_id: string) {
    try {
        const permissions = await Permission.findAll({ 
            where: { role_id: role_id },
            include: [{ model: Component, attributes: ['id', 'name'] }],
        }).catch(_error => { throw new PermissionError('Ha ocurrido un error al revisar el permiso.') }).then(permissions => permissions);
        if (!permissions) throw new PermissionError(`El permiso con no existe.`);
        const reshape_permission = permissions.map(permission => {
            return {
                id: permission.dataValues.id,
                component: {
                    id: permission.dataValues.component.dataValues.id,
                    name: permission.dataValues.component.dataValues.name,
                },
                create: permission.dataValues.create,
                read: permission.dataValues.read,
                update: permission.dataValues.update,
                delete: permission.dataValues.delete,
                updatedAt: permission.dataValues.updatedAt,
                createdAt: permission.dataValues.createdAt,
            }
        });
        return reshape_permission;
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al obtener el permiso.');
    }
}