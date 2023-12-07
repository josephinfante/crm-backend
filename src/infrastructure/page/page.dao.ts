import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { Page } from "../../domain/page/page";
import { PageModel } from "../../shared/models/page.model";
import { PageError } from "../../shared/errors";
import { ListCondition, UniqueID } from "../../shared/utils";
import { IPageResponse, PagePresenter } from "../../interfaces/presenters/page.presenter";

class PageDao {
    async create(access: IAccessPermission, page: Page): Promise<IPageResponse> {
        try {
            const new_page = {
                id: UniqueID.generate(),
                name: page.name,
                internal_url: null,
                external_url: page.external_url,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                user_id: access.user_id
            }
            const [_page, created] = await PageModel.findOrCreate({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: page.name },
                                ]
                            },
                            { user_id: access.user_id }
                        ]
                    },
                    defaults: new_page
                })
                .then(page => page)
                .catch(_error => {throw new PageError("Ha ocurrido un error al tratar de crear la página")});

            if (!created) throw new PageError("Ya existe una página con el mismo nombre o url externo");

            return PagePresenter(new_page, access);
        } catch (error) {
            if (error instanceof PageError) throw new PageError(error.message);
            else throw new Error("Ha ocurrido un error al crear la página");
        }
    }
    async update(access: IAccessPermission, id: string, page: Page): Promise<IPageResponse> {
        try {
            const page_exist = access.super_admin === true ?
                await PageModel.findOne({ where: { id : id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de obtener la página") }) :
                await PageModel.findOne({ where: { id : id, user_id: access.user_id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de obtener la página") });
            if (!page_exist) throw new PageError(`La página con ID ${id} no existe`);

            const page_coincidence = await PageModel.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: page.name },
                                ]
                            },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                            { id: { [Op.ne]: id } }
                        ]
                    }
                })
                .then(pages => pages)
                .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de obtener las páginas")});

            if (page_coincidence.length > 0) throw new PageError("Ya existe una página con el mismo nombre o url externo");

            page_exist.set({
                name: page.name ?? page_exist.dataValues.name,
                external_url: page.external_url ?? page_exist.dataValues.external_url,
                hidden: page.hidden ?? page_exist.dataValues.hidden,
                updatedAt: Date.now()
            });
            const updated = await page_exist.save()
                .then(page => page)
                .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de actualizar la página") });

            return PagePresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof PageError) throw new PageError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la página");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<void> {
        try {
            const page_exist = access.super_admin === true ?
                await PageModel.findOne({ where: { id : id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de obtener la página") }) :
                await PageModel.findOne({ where: { id : id, user_id: access.user_id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de obtener la página") });

            if (!page_exist) throw new PageError(`La página con ID ${id} no existe`);

            page_exist.set({
                deleted: true,
                updatedAt: Date.now()
            })
            await page_exist.save().catch(_error => { throw new PageError("Ha ocurrido un error al tratar de eliminar la página") });
        } catch (error) {
            if (error instanceof PageError) throw new PageError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la página");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IPageResponse> {
        try {
            const page = access.super_admin === true ?
                await PageModel.findOne({ where: { id : id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de obtener la página") }) :
                await PageModel.findOne({ where: { id : id, user_id: access.user_id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de obtener la página") });

            if (!page) throw new PageError(`La página con ID ${id} no existe`);

            return PagePresenter(page.dataValues, access);
        } catch (error) {
            if (error instanceof PageError) throw new PageError(error.message);
            else throw new Error("Ha ocurrido un error al obtener la página");
        }
    }
    async findAll(access: IAccessPermission): Promise<IPageResponse[]> {
        try {
            const pages = access.super_admin === true ?
                await PageModel.findAll()
                    .then(pages => pages)
                    .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de obtener las páginas") }) :
                await PageModel.findAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access), //excludes hidden and deleted if it doesn't have permission
                        ],
                    })
                    .then(pages => pages)
                    .catch(_error => { throw new PageError("Ha ocurrido un error al tratar de obtener las páginas") });

            return pages.map(page => PagePresenter(page.dataValues, access));
        } catch (error) {
            if (error instanceof PageError) throw new PageError(error.message);
            else throw new Error("Ha ocurrido un error al obtener las páginas");
        }
    }
}
export const pageDao = new PageDao();
export default pageDao;