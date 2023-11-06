import { ComponentError, PermissionError, RoleError } from "../../../shared/errors";
import { Component, Permission, Role } from "../../../shared/schemas";
import { UniqueID } from "../../../shared/utils";
import { PermissionCreateInterface } from "../permission.type";

export async function CreatePermission(permission : PermissionCreateInterface) {
    try {
        const role = await Role.findOne({ where: { name: permission.role } }).catch(_error => { throw new RoleError('Ha ocurrido un error al revisar el rol.') }).then(role => role);
        const component = await Component.findOne({ where: { name: permission.component } }).catch(_error => { throw new ComponentError('Ha ocurrido un error al revisar el componente.') }).then(component => component);
        if (!role) throw new RoleError(`El rol ${permission.role} no existe.`);
        if (!component) throw new ComponentError(`El componente ${permission.component} no existe.`);
        const permission_exist = await Permission.findOne({ where: { component_id: component.dataValues.id, role_id: role.dataValues.id } }).catch(_error => { throw new PermissionError('Ha ocurrido un error al revisar el permiso.') }).then(permission => permission);
        if (permission_exist) throw new PermissionError(`El permiso del rol ${role.dataValues.name}, para el componente ${component.dataValues.name} ya existe.`);
        await Permission.create({
            id: UniqueID.generate(),
            create: permission.create,
            read: permission.read,
            update: permission.update,
            delete: permission.delete,
            createdAt: new Date(),
            updatedAt: new Date(),
            component_id: component.dataValues.id,
            role_id: role.dataValues.id,
        }).catch(_error => { throw new PermissionError('Ha ocurrido un error al tratar de crear el permiso.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al crear el permiso.');
    }
}