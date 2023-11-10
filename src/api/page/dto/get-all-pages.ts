import { Op } from "sequelize";
import { PageError, RoleError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";

export async function GetAllPages() {
    try {
        const pages = await Page.findAll({}).catch(_error => {throw new PageError('Ha ocurrido un error al tratar de obtener las páginas.')}).then(pages => pages);
        const roleIds = pages.map(page => page.dataValues.role_ids.split(',')).flat();
        const roles = await Role.findAll({ where: { id: { [Op.in]: roleIds } } }).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(roles => roles);
        const reshapedPages = pages.map(page => {
            const roleNames = roles.filter(role => page.dataValues.role_ids.split(',').includes(role.dataValues.id)).map(role => role.dataValues.name);
            return {
                id: page.dataValues.id,
                name: page.dataValues.name,
                roles: roleNames,
                updatedAt: page.dataValues.updatedAt,
                createdAt: page.dataValues.createdAt,
            }
        });
        return reshapedPages;
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al obtener las páginas.');
    }
}