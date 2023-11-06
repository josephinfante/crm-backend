import { PageError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";

export async function GetPage(id: string) {
    try {
        const page = await Page.findOne({
            where: {id},
            include: [{ model: Role, attributes: ['name'] }],
        }).catch(_error => {throw new PageError('Ha ocurrido un error al revisar la página.')}).then(page => page);
        if (!page) throw new PageError(`La página con ID ${id} no existe.`);
        return {
            id: page.dataValues.id,
            name: page.dataValues.name,
            role: page.dataValues.role.dataValues.name,
            updatedAt: page.dataValues.updatedAt,
            createdAt: page.dataValues.createdAt,
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al obtener la página.');
    }
}