import { PageError } from "../../../shared/errors";
import { Page } from "../../../shared/schemas";

export async function DeletePage(id: string) {
    try {
        const page = await Page.findOne({where: {id}}).catch(_error => {throw new PageError('Ha ocurrido un error al revisar la página.')}).then(page => page);
        if (!page) throw new PageError(`La página con ID ${id} no existe.`);
        await page.destroy().catch(_error => {throw new PageError('Ha ocurrido un error al tratar de eliminar la página.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al eliminar la página.');
    }
}