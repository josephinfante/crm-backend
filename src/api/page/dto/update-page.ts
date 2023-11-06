import { PageError, RoleError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";

export async function UpdatePage(id: string, data: {name: string, role: string}){
    try {
        const page = await Page.findOne({where: {id}}).catch(_error => {throw new PageError('Ha ocurrido un error al revisar la página.')}).then(page => page);
        if (!page) throw new PageError(`La página con ID ${id} no existe.`);
        const role = data.role ? await Role.findOne({where: {name: data.role}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role) : null;
        if (data.role && !role) throw new RoleError(`El rol ${data.role} no existe.`);
        page.set({
            name: data.name ?? page.dataValues.name,
            role_id: data.role && (role?.dataValues.id !== page.dataValues.role_id) ? role?.dataValues.id : page.dataValues.role_id,
            updatedAt: new Date(),
        });
        await page.save().catch(_error => {throw new PageError('Ha ocurrido un error al tratar de actualizar la página.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar la página.');
    }
}