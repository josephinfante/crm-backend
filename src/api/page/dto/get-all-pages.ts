import { PageError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";

export async function GetAllPages() {
    try {
        const pages = await Page.findAll({
            include: [{ model: Role, attributes: ['name'] }],
            raw: true,
        }).catch(_error => {throw new PageError('Ha ocurrido un error al tratar de obtener las páginas.')});
        const reshapedPages = pages.map((page: any) => ({
            id: page.id,
            name: page.name,
            role: page['role.name'],
            updatedAt: page.updatedAt,
            createdAt: page.createdAt,
        }));
        return reshapedPages;
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al obtener las páginas.');
    }
}