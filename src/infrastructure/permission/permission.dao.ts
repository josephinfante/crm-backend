import { IAccessPermission } from "../../domain/auth/access.type";
import { ICreatePermission } from "../../domain/permission/permission.type";
import { IRoleComponent } from "../../interfaces/presenters/role.presenter";
import { PermissionError } from "../../shared/errors";
import { ComponentModel } from "../../shared/models/component.model";
import { PermissionModel } from "../../shared/models/permission.model";
import { UniqueID } from "../../shared/utils";

export async function CreatePermission(access: IAccessPermission, role_id: string, component_id: string, permissions: ICreatePermission) {
    try {
        await PermissionModel.create({
            id: UniqueID.generate(),
            create: permissions.create,
            read: permissions.read,
            update: permissions.update,
            delete: permissions.delete,
            read_all: permissions.read_all,
            read_deleted: permissions.read_deleted,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            component_id: component_id,
            role_id: role_id,
            user_id: access.user_id
        }).catch(_error => {throw new PermissionError('Ha ocurrido un error al tratar de crear el permiso.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al crear el permiso.');
    }
}

export async function UpdatePermission(access: IAccessPermission, role_id: string, component_id: string, permissions: ICreatePermission) {
    try {
        await CreatePermission(access, role_id, component_id, permissions);
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar el permiso.');
    }
}

export async function DeletePermission(access: IAccessPermission, role_id: string) {
    try {
        access.super_admin === true ? 
            await PermissionModel.destroy({ where: { role_id: role_id } })
                .catch((_error) => {throw new PermissionError('Ha ocurrido un error al tratar eliminar los permisos.')}) :
            await PermissionModel.destroy({ where: { role_id: role_id, user_id: access.user_id } })
                .catch((_error) => {throw new PermissionError('Ha ocurrido un error al tratar eliminar los permisos.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al eliminar los permisos.');
    }
}

export async function FindComponentWithPermission(access: IAccessPermission, role_id: string): Promise<IRoleComponent[]> {
    try {
        const permissions = access.super_admin === true ? 
            await PermissionModel.findAll({ 
                    where: { role_id: role_id },
                    include: [{ model: ComponentModel, attributes: ['id', 'name', 'createdAt', 'updatedAt'] }]
                })
                .then(permissions => permissions)
                .catch((_error) => {throw new PermissionError('Ha ocurrido un error al tratar de buscar los permisos.')}) :
            await PermissionModel.findAll({ 
                    where: { role_id: role_id, user_id: access.user_id },
                    include: [{ model: ComponentModel, attributes: ['id', 'name', 'createdAt', 'updatedAt'] }]
                })
                .then(permissions => permissions)
                .catch((_error) => {throw new PermissionError('Ha ocurrido un error al tratar de buscar los permisos.')});

        const componentsWithPermission = permissions.map(permission => {
            return {
                id: permission.dataValues.component_id,
                name: permission.dataValues.component.dataValues.name,
                permissions: {
                    create: permission.dataValues.create,
                    read: permission.dataValues.read,
                    update: permission.dataValues.update,
                    delete: permission.dataValues.delete,
                    read_all: permission.dataValues.read_all,
                    read_deleted: permission.dataValues.read_deleted,
                },
                updatedAt: permission.dataValues.component.dataValues.updatedAt,
                createdAt: permission.dataValues.component.dataValues.createdAt
            }
        });
        return componentsWithPermission;
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al buscar los permisos.');
    }
}

export async function GetPermissionsByRoleId(role_id: string): Promise<IRoleComponent[]> {
    try {
        const permissions = await PermissionModel.findAll({ 
                where: { role_id: role_id },
                include: [{ model: ComponentModel, attributes: ['id', 'name', 'createdAt', 'updatedAt'] }]
            })
            .then(permissions => permissions)
            .catch((_error) => {throw new PermissionError('Ha ocurrido un error al tratar de buscar los permisos.')})

        const permissionsByRoleId = permissions.map(permission => {
            return {
                id: permission.dataValues.component_id,
                name: permission.dataValues.component.dataValues.name,
                permissions: {
                    create: permission.dataValues.create,
                    read: permission.dataValues.read,
                    update: permission.dataValues.update,
                    delete: permission.dataValues.delete,
                    read_all: permission.dataValues.read_all,
                    read_deleted: permission.dataValues.read_deleted,
                },
                updatedAt: permission.dataValues.component.dataValues.updatedAt,
                createdAt: permission.dataValues.component.dataValues.createdAt
            }
        });
        return permissionsByRoleId;
    } catch (error) {
        if (error instanceof Error && error.message) throw new PermissionError(error.message);
        else throw new Error('Ha ocurrido un error al buscar los permisos.');
    }
}