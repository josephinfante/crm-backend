import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { Nationality } from "../../domain/nationality/nationality";
import { ContactLanguageModel, NationalityModel } from "../../shared/models";
import { UniqueID, ListCondition } from "../../shared/utils";
import { ContactDegreeError, NationalityError } from "../../shared/errors";
import { INationalityResponse, NationalityPresenter } from "../../interfaces/presenters/nationality.presenter";

class NationalityDao {
    async create(access: IAccessPermission, nationality: Nationality): Promise<INationalityResponse> {
        try {
            const new_nationality = {
                id: UniqueID.generate(),
                name: nationality.name,
                code: nationality.code,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: access.user_id,
            }
            const [_nationality, created] = await NationalityModel.findOrCreate({
                    where: {
                        [Op.or]: [
                            { name: nationality.name },
                            { code: nationality.code },
                        ]
                    },
                    defaults: new_nationality
                })
                .then(nationality => nationality)
                .catch((_error) => { throw new NationalityError("Ha ocurrido un error al tratar de crear la nacionalidad.") });

            if (!created) throw new NationalityError('La nacionalidad con los datos proporcionados ya existe.');
            return NationalityPresenter(new_nationality, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new NationalityError(error.message);
            else throw new Error("Ha ocurrido un error al crear la nacionalidad.");
        }
    }
    async update(access: IAccessPermission, id: string, nationality: Nationality): Promise<INationalityResponse> {
        try {
            const nationality_exist = access.super_admin === true ? 
                await NationalityModel.findOne({ where: { id: id } })
                    .then(nationality => nationality)
                    .catch((_error) => { throw new NationalityError("Ha ocurrido un error al revisar la nacionalidad.") }) : 
                await NationalityModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(nationality => nationality)
                    .catch((_error) => { throw new NationalityError("Ha ocurrido un error al revisar la nacionalidad.") });

            if (!nationality_exist) throw new NationalityError('La nacionalidad no existe.');

            const nationality_coincidence = (nationality.name !== nationality_exist.dataValues.name || nationality.code !== nationality_exist.dataValues.code) ? await NationalityModel.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: nationality.name },
                                    { code: nationality.code }
                                ]
                            },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                            { id: { [Op.ne]: id } }
                        ]
                    }
                })
                .then(nationalites => nationalites)
                .catch((_error) => { throw new NationalityError("Ha ocurrido un error al revisar la nacionalidad.") }) : [];

            if (nationality_coincidence.length > 0) throw new NationalityError("Ya existe una nacionalidad con los datos proporcionados.");

            nationality_exist.set({
                name: nationality.name ?? nationality_exist.dataValues.name,
                code: nationality.code ?? nationality_exist.dataValues.code,
                hidden: nationality.hidden ?? nationality_exist.dataValues.hidden,
                updatedAt: Date.now(),
            });
            const updated = await nationality_exist.save()
                .then(nationality => nationality)
                .catch((_error) => { throw new NationalityError("Ha ocurrido un error al tratar de actualizar la nacionalidad.") });

            return NationalityPresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new NationalityError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la nacionalidad.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        try {
            const nationality_exist = access.super_admin === true ? 
                await NationalityModel.findOne({ where: { id: id } })
                    .then(nationality => nationality)
                    .catch((_error) => { throw new NationalityError("Ha ocurrido un error al revisar la nacionalidad.") }) : 
                await NationalityModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(nationality => nationality)
                    .catch((_error) => { throw new NationalityError("Ha ocurrido un error al revisar la nacionalidad.") });

            if (!nationality_exist) throw new NationalityError('La nacionalidad no existe.');

            const contacts_affected = await ContactLanguageModel.count({ where: { language_id: id } })
                .then(count => count)
                .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al obtener los contactos afectados.") });

            nationality_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });
            await nationality_exist.save().catch((_error) => {throw new NationalityError("Ha ocurrido un error al tratar de eliminar la nacionalidad.")});
            return `La nacionalidad ha sido eliminada. ${contacts_affected ? `${contacts_affected} contactos han sido afectados.` : ""}`;
        } catch (error) {
            if (error instanceof Error && error.message) throw new NationalityError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la nacionalidad.");
        }
    }
    async findAll(access: IAccessPermission, nationality?: string): Promise<INationalityResponse[]> {
        try {
            const whereCondition: Record<string, any> = { user_id: access.user_id };

            if (access.super_admin === true) {
                delete whereCondition.user_id;
            }

            let nameOrCodeCondition: WhereOptions = {};

            if (nationality) {
                const nationalityCondition = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${nationality}%` } },
                        { code: { [Op.like]: `%${nationality}%` } },
                    ],
                };

                nameOrCodeCondition = nationalityCondition;
            }

            const nationalities = await NationalityModel.findAll({
                where: {
                    ...whereCondition,
                    ...nameOrCodeCondition,
                    ...ListCondition(access),
                },
            });

            return nationalities.map(nationality => NationalityPresenter(nationality.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new NationalityError(error.message);
            else throw new Error("Ha ocurrido un error al buscar las nacionalidades.");
        }
    }
}
const nationalityDao = new NationalityDao();
export default nationalityDao;