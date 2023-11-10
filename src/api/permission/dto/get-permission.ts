import { PermissionError } from "../../../shared/errors";
import { Component, Permission, Role } from "../../../shared/schemas";

export async function GetPermission(id: string) {
    try {
        const permission = await Permission.findOne({ 
            where: { id },
            include: [{ model: Role, attributes: ['name'] }, { model: Component, attributes: ['name'] }],
        }).catch(_error => { throw new PermissionError('Ha ocurrido un error al revisar el permiso.') }).then(permission => permission);
        if (!permission) throw new PermissionError(`El permiso con ID ${id} no existe.`);
        return {
            id: permission.dataValues.id,
            component: permission.dataValues.component.dataValues.name,
            role: permission.dataValues.role.dataValues.name,
            create: permission.dataValues.create === 1 ? true : false,
            read: permission.dataValues.read === 1 ? true : false,
            update: permission.dataValues.update === 1 ? true : false,
            delete: permission.dataValues.delete === 1 ? true : false,
            updatedAt: permission.dataValues.updatedAt,
            createdAt: permission.dataValues.createdAt,
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al obtener el permiso.');
    }
}