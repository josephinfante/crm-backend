import { ComponentError, PermissionError, RoleError } from "../../../shared/errors";
import { Component, Permission, Role } from "../../../shared/schemas";
import { PermissionUpdateInterface } from "../permission.type";

export async function UpdatePermission(id: string, data: PermissionUpdateInterface){
    try {
        const permission = await Permission.findOne({ where: { id } }).catch(_error => { throw new PermissionError('Ha ocurrido un error al revisar el permiso.') }).then(permission => permission);
        if (!permission) throw new PermissionError(`El permiso con ID ${id} no existe.`);
        const role = data.role ? await Role.findOne({ where: { name: data.role } }).catch(_error => { throw new RoleError('Ha ocurrido un error al encontrar el rol.') }).then(role => role) : null;
        const component = data.component ? await Component.findOne({ where: { name: data.component } }).catch(_error => { throw new ComponentError('Ha ocurrido un error al encontrar el componente.') }).then(component => component) : null;
        if (data.role && !role) throw new RoleError(`El rol ${data.role} no existe.`);
        if (data.component && !component) throw new ComponentError(`El componente ${data.component} no existe.`);
        permission.set({
            create: data.create,
            read: data.read,
            update: data.update,
            delete: data.delete,
            role_id: (data.role && role) && (role.dataValues.id !== permission.dataValues.role_id) ? role.dataValues.id : permission.dataValues.role_id,
            component_id: (data.component && component) && (component.dataValues.id !== permission.dataValues.component_id) ? component.dataValues.id : permission.dataValues.component_id,
            updatedAt: new Date(),
        });
        await permission.save().catch(_error => {throw new PermissionError('Ha ocurrido un error al tratar de actualizar el permiso.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar el permiso.');
    }
}