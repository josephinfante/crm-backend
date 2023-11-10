import { Op } from "sequelize";
import { PageError, RoleError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";

export async function GetPage(id: string) {
    try {
        const page = await Page.findOne({where: {id: id}}).catch(_error => {throw new PageError('Ha ocurrido un error al revisar la página.')}).then(page => page);
        if (!page) throw new PageError(`La página con ID ${id} no existe.`);
        const roleIds = page.dataValues.role_ids.split(",") || [];
        const roles = await Role.findAll({ where: { id: { [Op.in]: roleIds } } }).catch(_error => {console.log(_error);throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role);
        const roleNames = roles.map(role => role.dataValues.name);
        return {
            id: page.dataValues.id,
            name: page.dataValues.name,
            roles: roleNames,
            updatedAt: page.dataValues.updatedAt,
            createdAt: page.dataValues.createdAt,
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al obtener la página.');
    }
}