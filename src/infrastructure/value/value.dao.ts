import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { Value } from "../../domain/value/value";
import { ValueError } from "../../shared/errors";
import { ValueModel } from "../../shared/models";
import { ListCondition, UniqueID } from "../../shared/utils";
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
                .catch(_error => { throw new ValueError("Ha ocurrido un error al tratar de crear el valor.")});
            if (!created) throw new ValueError("Ya existe un valor con los datos proporcionados.");

            return ValuePresenter(new_value, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al crear el valor.");
        }
    }
    async update(access: IAccessPermission, id: string, value: Value): Promise<IValueResponse> {
        try {
            const value_exist = await ValueModel.findOne({ where: { id: id }})
                .then(value => value)
                .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el valor.") });
            if (!value_exist) throw new ValueError('El valor no existe.');

            const value_coincidence = ( value.select_name !== value_exist.dataValues.select_name || value.key !== value_exist.dataValues.key ) ?
                await ValueModel.findOne({
                        where: [
                            { select_name: value.select_name },
                            { key: value.key },
                            {id: { [Op.ne]: id } }
                        ]
                    })
                    .then(value => value)
                    .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el valor.") }) : null;
            if (value_coincidence) throw new ValueError("Ya existe un valor con los datos proporcionados.");

            value_exist.set({
                select_name: value.select_name ?? value_exist.dataValues.select_name,
                key: value.key ?? value_exist.dataValues.key,
                value: value.value ?? value_exist.dataValues.value,
                updatedAt: Date.now(),
            });

            const updated = await value_exist.save()
                .then(value => value)
                .catch((_error) => { throw new ValueError("Ha ocurrido un error al tratar actualizar el valor.") });

            return ValuePresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el valor.");
        }
    }
    async delete(_access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const value_exist = await ValueModel.findOne({ where: { id: id }})
                .then(value => value)
                .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el valor.") });
            if (!value_exist) throw new ValueError('el valor no existe.');

            value_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });
            await value_exist.save().catch((_error) => { throw new ValueError("Ha ocurrido un error al tratar de eliminar el valor.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el valor.");
        }
    }
    async findAll(access: IAccessPermission, hidden?: boolean): Promise<IValueResponse[]> {
        try {
            const values = await ValueModel.findAll({
                    where: [
                        ListCondition(access, hidden),
                    ]
                })
                .then(values => values)
                .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el valor.") });
            return values.map(value => ValuePresenter(value.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al buscar los detalles del canal de contacto.");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IValueResponse> {
        try {
            const value = await ValueModel.findOne({ where:{ id: id }})
                .then(value => value)
                .catch((_error) => { throw new ValueError("Ha ocurrido un error al revisar el valor.") });

            return ValuePresenter(value?.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ValueError(error.message);
            else throw new Error("Ha ocurrido un error al buscar los detalles del canal de contacto.");
        }
    }
}
const valueDao = new ValueDao();
export default valueDao;