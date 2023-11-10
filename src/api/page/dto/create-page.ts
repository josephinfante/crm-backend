import { Op } from "sequelize";
import { PageError, RoleError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";
import { UniqueID } from "../../../shared/utils";
import { CreatePageInterface } from "../page.type";

export async function CreatePage(data: CreatePageInterface) {
    try {
        const page_exists = await Page.findOne({where: {name: data.name}}).catch(_error => {throw new PageError('Ha ocurrido un error al revisar la página.')}).then(page => page);
        if (page_exists) throw new PageError(`La página ${data.name} ya existe.`);
        const roleNames = data.roles || [];
        const existingRoles = await Role.findAll({ where: { name: { [Op.in]: roleNames } } }).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(roles => roles);
        if (existingRoles.length !== roleNames.length) {
            const nonExistentRoles = roleNames.filter(roleName => !existingRoles.find(role => role.dataValues.name === roleName));
            throw new RoleError(`Los siguientes roles no existen: ${nonExistentRoles.join(', ')}`);
        }
        if (existingRoles.length === 0) throw new RoleError('Ingrese al menos un rol.');
        const roleIds = existingRoles.map(role => role.dataValues.id);
        const pageData: any = {
            id: UniqueID.generate(),
            name: data.name,
            role_ids: roleIds.join(','),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await Page.create(pageData).catch(_error => {throw new PageError('Ha ocurrido un error al tratar de crear la página.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al crear la página.');
    }
}