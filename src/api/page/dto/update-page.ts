import { Op } from "sequelize";
import { PageError, RoleError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";
import { UpdatePageInterface } from "../page.type";

export async function UpdatePage(id: string, data: UpdatePageInterface){
    try {
        const page = await Page.findOne({where: {id}}).catch(_error => {throw new PageError('Ha ocurrido un error al revisar la página.')}).then(page => page);
        if (!page) throw new PageError(`La página con ID ${id} no existe.`);
        const roleNames = data.roles || [];
        const existingRoles = data.roles ? await Role.findAll({ where: { name: { [Op.in]: roleNames } } }).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role) : [];
        if (existingRoles.length !== roleNames.length) {
            const nonExistentRoles = roleNames.filter(roleName => !existingRoles.find(role => role.dataValues.name === roleName));
            throw new RoleError(`Los siguientes roles no existen: ${nonExistentRoles.join(', ')}`);
        }
        if (existingRoles.length === 0) throw new RoleError('Ingrese al menos un rol.');
        const roleIds = existingRoles.map(role => role.dataValues.id);
        page.set({
            name: data.name ?? page.dataValues.name,
            role_ids: data.roles ? roleIds.join(',')  : page.dataValues.role_id,
            updatedAt: new Date(),
        });
        await page.save().catch(_error => {throw new PageError('Ha ocurrido un error al tratar de actualizar la página.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar la página.');
    }
}