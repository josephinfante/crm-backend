import { Op } from "sequelize";
import { PageError, RoleError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";

export async function GetPagesByRole(name: string) {
    try {
        const role = await Role.findOne({where: {name: name}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(user => user);
        if (!role) throw new PageError(`El rol ${name} no existe.`);
        const pages = await Page.findAll({
            where: {
                role_ids: {[Op.like]: [`%${role.dataValues.id}%`]}
            }
        }).catch(_error => {throw new PageError('Ha ocurrido un error al revisar las páginas del rol')}).then(pages => pages);
        return pages.map(page => page.dataValues.name);
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al obtener las páginas del rol.');
    }
}