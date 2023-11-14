import { Op } from "sequelize";
import { PageError } from "../../../shared/errors";
import { Page } from "../../../shared/schemas";

export async function GetPagesByRoleId(id: string) {
    try {
        const pages = await Page.findAll({
            where: {
                role_ids: {[Op.like]: [`%${id}%`]}
            }
        }).catch(_error => {throw new PageError('Ha ocurrido un error al revisar las páginas del rol')}).then(pages => pages);
        return pages.map(page => ({
                    id: page.dataValues.id,
                    name: page.dataValues.name,
                    nickname: page.dataValues.nickname,
                    internal_url: page.dataValues.internal_url,
                    external_url: page.dataValues.external_url,
                    updatedAt: page.dataValues.updatedAt,
                    createdAt: page.dataValues.createdAt,
                }));
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al obtener las páginas del rol.');
    }
}