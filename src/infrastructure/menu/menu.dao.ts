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
        await CreateMenu(access, role_id, page_id);
    } catch (error) {
        if (error instanceof Error && error.message) throw new MenuError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar el menu.');
    }
}

export async function DeleteMenu(access:IAccessPermission, role_id: string) {
    try {
        access.super_admin === true ?
            await MenuModel.destroy({ where: { role_id: role_id } })
                .catch(_error => {throw new MenuError('Ha ocurrido un error al tratar eliminar el menu.')}) :
            await MenuModel.destroy({ where: { role_id: role_id, user_id: access.user_id } })
                .catch(_error => {throw new MenuError('Ha ocurrido un error al tratar eliminar el menu.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new MenuError(error.message);
        else throw new Error('Ha ocurrido un error al eliminar el menu.');
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

export async function FindAllPagesWithRoleId( access: IAccessPermission, role_id: string ): Promise<IRolePage[]> {
    try {
        const menus = access.super_admin === true ?
            await PageModel.findAll({
                    where: { deleted: false, hidden: false },
                })
                .then(pages => pages)
                .catch(_error => {throw new MenuError(_error.message??'Ha ocurrido un error al tratar de buscar las páginas.')}) :
            await MenuModel.findAll({ 
                    where: { role_id: role_id },
                    include: [{ model: PageModel, attributes: ['id', 'name', 'external_url', 'createdAt', 'updatedAt'], where: { deleted: false, hidden: false } }]
                })
                .then(menus => menus)
                .catch(_error => {throw new MenuError(_error.message??'Ha ocurrido un error al tratar de buscar los menus.')});


        if (access.super_admin === false) {
            const uniquePageIds = new Set<string>();
            const pagesWithMenu = menus.map((menu) => {
                const page_id = menu.dataValues.page.dataValues.id;
                if (access.super_admin && uniquePageIds.has(page_id)) return null;
                uniquePageIds.add(page_id);
                return {
                    id: page_id,
                    name: menu.dataValues.page.dataValues.name,
                    ...(menu.dataValues.page.dataValues.external_url && { external_url: menu.dataValues.page.dataValues.external_url }),
                    updatedAt: menu.dataValues.page.dataValues.updatedAt,
                    createdAt: menu.dataValues.page.dataValues.createdAt
                }
            })
            .filter((page) => page !== null)
            return pagesWithMenu;
        }

        const pageWithMenuSuperAdmin = menus.map(menu => {
            return {
                id: menu.dataValues.id,
                name: menu.dataValues.name,
                ...(menu.dataValues.external_url && { external_url: menu.dataValues.external_url }),
                updatedAt: menu.dataValues.updatedAt,
                createdAt: menu.dataValues.createdAt
            }
        });
        return pageWithMenuSuperAdmin;
    } catch (error) {
        if (error instanceof Error && error.message) throw new MenuError(error.message);
        else throw new Error('Ha ocurrido un error al buscar la pagina.');
    }
}