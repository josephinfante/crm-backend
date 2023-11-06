import { PageError, RoleError } from "../../../shared/errors";
import { Page, Role } from "../../../shared/schemas";
import { UniqueID } from "../../../shared/utils";

export async function CreatePage(page: {name: string, role: string}) {
    try {
        const page_exists = await Page.findOne({where: {name: page.name}}).catch(_error => {throw new PageError('Ha ocurrido un error al revisar la página.')}).then(page => page);
        if (page_exists) throw new PageError(`La página ${page.name} ya existe.`);
        const role = await Role.findOne({where: {name: page.role}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role);
        if (!role) throw new PageError(`El rol ${page.role} no existe.`);
        await Page.create({
            id: UniqueID.generate(),
            name: page.name,
            role_id: role.dataValues.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => {throw new PageError('Ha ocurrido un error al tratar de crear la página.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al crear la página.');
    }
}