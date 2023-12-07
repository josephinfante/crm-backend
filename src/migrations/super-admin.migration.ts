import { ComponentError } from "../shared/errors";
import { ComponentModel, MenuModel, PageModel, PermissionModel, RoleModel } from "../shared/models";
import { UniqueID } from "../shared/utils";

async function SuperAdminMigration() {
    try {
        const component_names: string[] = [];
        const components = await ComponentModel.findAll()
            .then(components => components.map(component => {
                component_names.push(component.dataValues.name);
                return {
                    id: component.dataValues.id,
                    permissions: {
                        create: true,
                        read: true,
                        update: true,
                        delete: true,
                        read_all: true,
                        read_deleted: true
                    }
                }
            }))
            .catch(_error => { throw new ComponentError('Ha ocurrido un error al tratar de buscar los componentes.') });
        const pages = await PageModel.findAll()
            .then(pages => pages.map(page => {
                if (component_names.includes(page.dataValues.name)) {
                    return {
                        id: page.dataValues.id,
                    }
                }
                return null;
            }).filter(page => page !== null) as { id: string }[])
            .catch(_error => { throw new ComponentError('Ha ocurrido un error al tratar de buscar las páginas.') });

        const new_role = {
            id: UniqueID.generate(),
            name: 'super admin',
            updatedAt: Date.now(),
            createdAt: Date.now(),
        }
        await RoleModel.create(new_role);
        for (const component of components) {
            await PermissionModel.create({
                id: UniqueID.generate(),
                create: component.permissions.create,
                read: component.permissions.read,
                update: component.permissions.update,
                delete: component.permissions.delete,
                read_all: component.permissions.read_all,
                read_deleted: component.permissions.read_deleted,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                component_id: component.id,
                role_id: new_role.id,
            });
        }
        for (const page of pages) {
            await MenuModel.create({
                id: UniqueID.generate(),
                updatedAt: Date.now(),
                createdAt: Date.now(),
                role_id: new_role.id,
                page_id: page.id!,
            });
        }
    } catch (error) {
        if (error instanceof Error && error.message) throw new Error(error.message);
        else throw new Error('Ha ocurrido un error al crear el rol super admin ejecutando la migración.');
    }
}

SuperAdminMigration();