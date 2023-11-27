import { IAccessPermission } from "../../domain/auth/access.type";
import { IRolePage } from "../../interfaces/presenters/role.presenter";
import { MenuError } from "../../shared/errors";
import { MenuModel } from "../../shared/models/menu.model";
import { PageModel } from "../../shared/models/page.model";
import { UniqueID } from "../../shared/utils";

export async function CreateMenu(access:IAccessPermission, role_id: string, page_id: string) {
    try {
        await MenuModel.create({
            id: UniqueID.generate(),
            updatedAt: Date.now(),
            createdAt: Date.now(),
            role_id: role_id,
            page_id: page_id,
            user_id: access.user_id,
        }).catch(_error => {throw new MenuError('Ha ocurrido un error al tratar de crear el menu.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new MenuError(error.message);
        else throw new Error('Ha ocurrido un error al crear el menu.');
    }
}

export async function UpdateMenu(access:IAccessPermission, role_id: string, page_id: string) {
    try {
        const menu = access.super_admin === true ?
            await MenuModel.findOne({ where: { role_id: role_id, page_id: page_id } })
                .then(menu => menu)
                .catch(_error => {throw new MenuError('Ha ocurrido un error al tratar de buscar el menu.')}) :
            await MenuModel.findOne({ where: { role_id: role_id, page_id: page_id, user_id: access.user_id } })
                .then(menu => menu)
                .catch(_error => {throw new MenuError('Ha ocurrido un error al tratar de buscar el menu.')});

        if (menu) {
            await menu.destroy()
                .catch(_error => {throw new MenuError('Ha ocurrido un error al tratar de eliminar el menu.')});

            await CreateMenu(access, role_id, page_id);
        }
    } catch (error) {
        if (error instanceof Error && error.message) throw new MenuError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar el menu.');
    }
}

export async function FindPageWithMenu(access:IAccessPermission, role_id: string): Promise<IRolePage[]> {
    try {
        const menus = access.super_admin === true ?
            await MenuModel.findAll({ 
                    where: { role_id: role_id },
                    include: [{ model: PageModel, attributes: ['id', 'name', 'external_url', 'createdAt', 'updatedAt'] }]
                })
                .then(menus => menus)
                .catch(_error => {throw new MenuError('Ha ocurrido un error al tratar de buscar los menus.')}) :
            await MenuModel.findAll({ 
                    where: { role_id: role_id, user_id: access.user_id },
                    include: [{ model: PageModel, attributes: ['id', 'name', 'external_url', 'createdAt', 'updatedAt'] }]
                })
                .then(menus => menus)
                .catch(_error => {throw new MenuError('Ha ocurrido un error al tratar de buscar los menus.')});

        const pagesWithMenu = menus.map(menu => {
            return {
                id: menu.dataValues.page_id,
                name: menu.dataValues.page.dataValues.name,
                ...(menu.dataValues.page.dataValues.external_url && { external_url: menu.dataValues.page.dataValues.external_url }),
                updatedAt: menu.dataValues.page.dataValues.updatedAt,
                createdAt: menu.dataValues.page.dataValues.createdAt
            }
        });
        return pagesWithMenu;
    } catch (error) {
        if (error instanceof Error && error.message) throw new MenuError(error.message);
        else throw new Error('Ha ocurrido un error al buscar la pagina.');
    }
}