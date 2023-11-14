import { PageError, RoleError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";
import { UpdatePermission } from "../../permission/dto/update-permission";
import { UpdateRoleInterface } from "../role.type";

export async function UpdateRole(id: string, data: UpdateRoleInterface) {
    try {
        const role = await Role.findOne({where: {id: id}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role);
        if (!role) throw new RoleError(`El rol con ID ${id} no existe.`);
        if (data.name !== role.dataValues.name) {
            await role.save().catch(_error => {throw new RoleError('Ha ocurrido un error al tratar de actualizar el rol.')});
        }
        if (data.pages && data.pages.length > 0) {
            for (const page of data.pages) {
                const page_exist = await Page.findOne({where: {id: page.id}}).catch(_error => {throw new PageError('Ha ocurrido un error al revisar la página.')}).then(page => page);
                if (page_exist && !page_exist.dataValues.role_ids.includes(id)) {
                    page_exist.set({role_ids: page_exist.dataValues.role_ids + ',' + id});
                    await page_exist.save().catch(_error => {throw new PageError('Ha ocurrido un error al tratar de actualizar la pagina.')});
                }
            }
        }
        if (data.components && data.components.length > 0) {
            for (const component of data.components) {
                await UpdatePermission({
                    component_id: component.id,
                    role_id: id,
                    create: component.permissions.create,
                    read: component.permissions.read,
                    update: component.permissions.update,
                    delete: component.permissions.delete,
                });
            }
        }
    } catch (error) {
        if (error instanceof Error && error.message) throw new RoleError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar el rol.');
    }
}