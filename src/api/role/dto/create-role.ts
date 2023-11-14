import { ComponentError, PageError, RoleError } from "../../../shared/errors";
import { Component, Page, Role } from "../../../shared/schemas";
import { UniqueID } from "../../../shared/utils";
import { CreatePermission } from "../../permission/dto/create-permission";
import { CreateRoleInterface } from "../role.type";

export async function CreateRole(data: CreateRoleInterface) {
    try {
        const role_exists = await Role.findOne({where: {name: data.name}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role);
        if (role_exists) throw new RoleError(`El rol ${data.name} ya existe.`);
        const role_id = UniqueID.generate();
        await Role.create({
            id: role_id,
            name: data.name,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => {throw new RoleError('Ha ocurrido un error al tratar de crear el rol.')});
        for (const page of data.pages) {
            const page_exist = await Page.findOne({where: {id: page.id}}).catch(_error => {throw new PageError('Ha ocurrido un error al revisar la página.')}).then(page => page);
            if (page_exist) {
                page_exist.set({role_ids: page_exist.dataValues.role_ids + ',' + role_id});
                await page_exist.save().catch(_error => {throw new PageError('Ha ocurrido un error al tratar de actualizar la pagina.')});
            }
        }
        for (const component of data.components) {
            const component_exist = await Component.findOne({where: {id: component.id}}).catch(_error => {throw new ComponentError('Ha ocurrido un error al revisar el componente.')}).then(component => component);
            if (component_exist) {
                await CreatePermission({
                    create: component.permissions.create,
                    read: component.permissions.read,
                    update: component.permissions.update,
                    delete: component.permissions.delete,
                    component_id: component.id,
                    role_id: role_id,
                })
            }
        }
    } catch (error) {
        if (error instanceof Error && error.message) throw new RoleError(error.message);
        else throw new Error('Ha ocurrido un error al crear el rol.');
    }
}