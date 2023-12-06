import { IAccessPermission } from "../../domain/auth/access.type";
import { Role } from "../../domain/role/role";
import { IRoleComponent, IRolePage, IRoleResponse, RolePresenter } from "../../interfaces/presenters/role.presenter";
import { PageError, RoleError } from "../../shared/errors";
import { RoleModel } from "../../shared/models";
import { PageModel } from "../../shared/models/page.model";
import { ListCondition, UniqueID } from "../../shared/utils";
import { FindComponentById } from "../component/component.dao";
import { CreateMenu, DeleteMenu, FindPageWithMenu, UpdateMenu } from "../menu/menu.dao";
import { CreatePermission, DeletePermission, FindComponentWithPermission, UpdatePermission } from "../permission/permission.dao";

class RoleDao {
    constructor() {
    }
    async create(access: IAccessPermission, role: Role): Promise<IRoleResponse> {
        try {
            let RPages: IRolePage[] = [];
            let RComponents: IRoleComponent[] = [];
            const new_role = {
                id: UniqueID.generate(),
                name: role.name,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                user_id: access.user_id
            }
            const [_role, created] = await RoleModel.findOrCreate({
                    where: { name: role.name },
                    defaults: new_role
                })
                .then(role => role)
                .catch(_error => { throw new RoleError('Ha ocurrido un error al tratar de crear el rol.') });
            if (!created) throw new RoleError(`El rol ${role.name} ya existe.`);
            for (const page of role.pages) {
                const page_exists = access.super_admin === true ? await PageModel.findOne({ where: { id: page.id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError('Ha ocurrido un error al revisar la página.') }) :
                    await PageModel.findOne({ where: { id: page.id, user_id: access.user_id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError('Ha ocurrido un error al revisar la página.') });

                if (!page_exists) throw new PageError(`La página con ID ${page.id} no existe.`);
                // create the menu
                await CreateMenu(access, new_role.id, page_exists.dataValues.id);

                RPages.push({
                    id: page_exists.dataValues.id,
                    name: page_exists.dataValues.name,
                    ...(page_exists.dataValues.external_url && { external_url: page_exists.dataValues.external_url }),
                    updatedAt: page_exists.dataValues.updatedAt,
                    createdAt: page_exists.dataValues.createdAt,
                });
            }
            for (const component of role.components) {
                const component_exist = await FindComponentById(component.id);
                // create the permission
                await CreatePermission(access, new_role.id, component_exist.id, component.permissions);
               
                RComponents.push({
                    id: component_exist.id,
                    name: component_exist.name,
                    permissions: {
                        create: component.permissions.create,
                        read: component.permissions.read,
                        update: component.permissions.update,
                        delete: component.permissions.delete,
                        read_all: component.permissions.read_all,
                        read_deleted: component.permissions.read_deleted,
                    },
                    updatedAt: component_exist.updatedAt,
                    createdAt: component_exist.createdAt
                });
            }
            return RolePresenter(new_role, RPages, RComponents, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new RoleError(error.message);
            else throw new Error('Ha ocurrido un error al tratar de crear el rol.');
        }
    }
    async update(access: IAccessPermission, id: string, role: Role): Promise<IRoleResponse> {
        try {
            let Rupdated: Role;
            let RPages: IRolePage[] = [];
            let RComponents: IRoleComponent[] = []
            const role_exists = access.super_admin === true ? await RoleModel.findOne({ where: { id } })
                .then(role => role)
                .catch(_error => { throw new RoleError('Ha ocurrido un error al tratar de buscar el rol.') }) :
                await RoleModel.findOne({ where: { id, user_id: access.user_id } })
                .then(role => role)
                .catch(_error => { throw new RoleError('Ha ocurrido un error al tratar de buscar el rol.') });

            if (!role_exists) throw new RoleError(`El rol con ID ${id} no existe.`);

            if (role.name !== role_exists.dataValues.name) {
                role_exists.set({
                    name: role.name ?? role_exists.dataValues.name,
                    updatedAt: Date.now(),
                })
                Rupdated = await role_exists.save()
                    .then(role => role.dataValues)
                    .catch(_error => { throw new RoleError('Ha ocurrido un error al tratar de actualizar el rol.') });
            } {
                Rupdated = role_exists.dataValues;
            }

            role.pages ? await DeleteMenu(access, Rupdated.id) : null;
            role.components ? await DeletePermission(access, Rupdated.id) : null;

            for (const page of role.pages) {
                const page_exists = access.super_admin === true ? await PageModel.findOne({ where: { id: page.id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError('Ha ocurrido un error al revisar la página.') }) :
                    await PageModel.findOne({ where: { id: page.id, user_id: access.user_id } })
                    .then(page => page)
                    .catch(_error => { throw new PageError('Ha ocurrido un error al revisar la página.') });

                if (!page_exists) throw new PageError(`La página con ID ${page.id} no existe.`);
                await UpdateMenu(access, Rupdated.id, page_exists.dataValues.id);

                RPages.push({
                    id: page_exists.dataValues.id,
                    name: page_exists.dataValues.name,
                    ...(page_exists.dataValues.external_url && { external_url: page_exists.dataValues.external_url }),
                    updatedAt: page_exists.dataValues.updatedAt,
                    createdAt: page_exists.dataValues.createdAt,
                });
            }

            for (const component of role.components) {
                const component_exist = await FindComponentById(component.id);
                await UpdatePermission(access, Rupdated.id, component_exist.id, component.permissions);
            
                RComponents.push({
                    id: component_exist.id,
                    name: component_exist.name,
                    permissions: {
                        create: component.permissions.create,
                        read: component.permissions.read,
                        update: component.permissions.update,
                        delete: component.permissions.delete,
                        read_all: component.permissions.read_all,
                        read_deleted: component.permissions.read_deleted,
                    },
                    updatedAt: component_exist.updatedAt,
                    createdAt: component_exist.createdAt
                });
            }
            return RolePresenter(Rupdated, RPages, RComponents, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new RoleError(error.message);
            else throw new Error('Ha ocurrido un error al actualizar el rol.');
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<void> {
        try {
            const role_exists = access.super_admin === true ? await RoleModel.findOne({ where: { id: id } })
                .then(role => role)
                .catch(_error => { throw new RoleError('Ha ocurrido un error al tratar de buscar el rol.') }) :
                await RoleModel.findOne({ where: { id: id, user_id: access.user_id } })
                .then(role => role)
                .catch(_error => { throw new RoleError('Ha ocurrido un error al tratar de buscar el rol.') });

            if (!role_exists) throw new RoleError(`El rol con ID ${id} no existe.`);

            role_exists.set({
                deleted: true,
                updatedAt: Date.now(),
            })
            await role_exists.save().catch(_error => { throw new RoleError('Ha ocurrido un error al tratar de eliminar el rol.') });
        } catch (error) {
            if (error instanceof Error && error.message) throw new RoleError(error.message);
            else throw new Error('Ha ocurrido un error al eliminar el rol.');
        }
    }
    async findAll(access: IAccessPermission, name?: string): Promise<IRoleResponse[] | IRoleResponse> {
        try {
            const whereCondition: Record<string, any> = { user_id: access.user_id};

            if (access.super_admin === true) {
                delete whereCondition.user_id;
            }

            if (name) {
                whereCondition.name = name;
            }

            const roles = await RoleModel.findAll({ where: [whereCondition, ListCondition(access)] });

            const roleResponses: IRoleResponse[] = await Promise.all(
                roles.map(async (role) => {
                    const pagesWithMenu = await FindPageWithMenu(access, role.dataValues.id);
                    const componentsWithPermission = await FindComponentWithPermission(access, role.dataValues.id);

                    return {
                        id: role.dataValues.id,
                        name: role.dataValues.name,
                        pages: pagesWithMenu,
                        components: componentsWithPermission,
                        hidden: role.dataValues.hidden,
                        ...(access?.super_admin || access?.permission.read_deleted ? { deleted: role.dataValues.deleted } : {}),
                        createdAt: role.dataValues.createdAt,
                        updatedAt: role.dataValues.updatedAt,
                    };
                })
            );

            if (name) {
                if (roleResponses.length === 0) {
                    throw new RoleError(`El rol ${name} no existe.`);
                }

                return roleResponses[0];
            }

            return roleResponses;
        } catch (error) {
            if (error instanceof Error && error.message) throw new RoleError(error.message);
            else throw new Error('Ha ocurrido un error al tratar de buscar los roles.');
        }
    }
}
export const roleDao = new RoleDao();
export default roleDao;