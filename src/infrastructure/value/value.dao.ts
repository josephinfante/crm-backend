import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { Value } from "../../domain/value/value";
import { ValueError } from "../../shared/errors";
import { ValueModel } from "../../shared/models";
import { UniqueID } from "../../shared/utils";
import { ValuePresenter, IValueResponse } from "../../interfaces/presenters/value.presenter";

class ValueDao {
    async create(access: IAccessPermission, value: Value): Promise<IValueResponse> {
        try {
            const new_value = {
                id: UniqueID.generate(),
                select_name: value.select_name,
                key: value.key,
                value: value.value,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: access.user_id,
            }
            const [_value, created] = await ValueModel.findOrCreate({
                    where: [
                        { select_name: new_value.select_name },
                        { key: new_value.key }
                    ],
                    defaults: new_value,
                })
                .then(value => value)
                .catch(_error => { throw new ValueError("Ha ocurrido un error al tratar de crear el detalle del canal de contacto.")});
            if (!created) throw new ValueError("Ya existe un detalle del canal de contacto con los datos proporcionados.");

            return ValuePresenter(new_value, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al crear el detalle del canal de contacto.");
        }
    }
    async update(access: IAccessPermission, id: string, value: Value): Promise<IValueResponse> {
        try {
            const value_exist = await ValueModel.findOne({ 
                where: [ 
                    { id: id },
                    ...(access.super_admin === false ? [{user_id: access.user_id}] :[])
                ]
            })
            .then(value => value)
            .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });
            if (!value_exist) throw new ValueError('El detalle del canal de contacto no existe.');

            const value_coincidence = ( value.select_name !== value_exist.dataValues.select_name || value.key !== value_exist.dataValues.key ) ?
                await ValueModel.findOne({
                        where: [
                            { select_name: value.select_name },
                            { key: value.key },
                            {id: { [Op.ne]: id } }
                        ]
                    })
                    .then(value => value)
                    .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el detalle del canal de contacto.") }) : null;
            if (value_coincidence) throw new ValueError("Ya existe un detalle del canal de contacto con los datos proporcionados.");

            value_exist.set({
                select_name: value.select_name ?? value_exist.dataValues.select_name,
                key: value.key ?? value_exist.dataValues.key,
                value: value.value ?? value_exist.dataValues.value,
                updatedAt: Date.now(),
            });

            const updated = await value_exist.save()
                .then(value => value)
                .catch((_error) => { throw new ValueError("Ha ocurrido un error al tratar actualizar el detalle del canal de contacto.") });

            return ValuePresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el detalle del canal de contacto.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const value_exist = await ValueModel
            .findOne({ where: [
                { id: id },
                ...(access.super_admin === false? [{user_id: access.user_id}]: [])
            ] })
            .then(value => value)
            .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });
            if (!value_exist) throw new ValueError('El detalle del canal de contacto no existe.');

            value_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });
            await value_exist.save().catch((_error) => { throw new ValueError("Ha ocurrido un error al tratar de eliminar el detalle del canal de contacto.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el detalle del canal de contacto.");
        }
    }
    async findAll(access: IAccessPermission): Promise<IValueResponse[]> {
        try {
            const values = await ValueModel.findAll({ 
                where: [
                    ...(access.super_admin === false?[{ user_id: access.user_id }]:[]),
                ]
            })
            .then(values => values)
            .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });
            return values.map(value => ValuePresenter(value.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al buscar los detalles del canal de contacto.");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IValueResponse> {
        try {
            const value = await ValueModel.findOne({ 
                where: [
                    ...(access.super_admin === false?[{ user_id: access.user_id }]:[]),
                    { id: id }
                ]
            })
            .then(value => value)
            .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el detalle del canal de contacto.") });

            return ValuePresenter(value?.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al buscar los detalles del canal de contacto.");
        }
    }
}
const valueDao = new ValueDao();
export default valueDao;