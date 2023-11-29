import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { UniqueID, ListCondition } from "../../shared/utils";
import { Ethnicity } from "../../domain/ethnicity/ethnicity";
import { EthnicityPresenter, IEthnicityResponse } from "../../interfaces/presenters/ethnicity.presenter";
import { EthnicityModel } from "../../shared/models/ethnicity.model";
import { ContactDegreeError, EthnicityError } from "../../shared/errors";
import { ContactLanguageModel } from "../../shared/models";

class EthnicityDao {
    async create(access: IAccessPermission, ehtnicity: Ethnicity): Promise<IEthnicityResponse> {
        try {
            const new_ethnicity = {
                id: UniqueID.generate(),
                name: ehtnicity.name,
                code: ehtnicity.code,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: access.user_id,
            }
            const [_ehtnicity, created] = await EthnicityModel.findOrCreate({
                    where: {
                        [Op.or]: [
                            { name: ehtnicity.name },
                            { code: ehtnicity.code },
                        ]
                    },
                    defaults: new_ethnicity
                })
                .then(ehtnicity => ehtnicity)
                .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al tratar de crear la etnia.") });

            if (!created) throw new EthnicityError('La etnia con los datos proporcionados ya existe.');
            return EthnicityPresenter(new_ethnicity, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new EthnicityError(error.message);
            else throw new Error("Ha ocurrido un error al crear la etnia.");
        }
    }
    async update(access: IAccessPermission, id: string, ethnicity: Ethnicity): Promise<IEthnicityResponse> {
        try {
            const ethnicity_exist = access.super_admin === true ? 
                await EthnicityModel.findOne({ where: { id: id } })
                    .then(ethnicity => ethnicity)
                    .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al revisar la etnia.") }) : 
                await EthnicityModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(ethnicity => ethnicity)
                    .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al revisar la etnia.") });

            if (!ethnicity_exist) throw new EthnicityError('La etnia no existe.');

            const ethnicity_coincidence = (ethnicity.name !== ethnicity_exist.dataValues.name || ethnicity.code !== ethnicity_exist.dataValues.code) ? await EthnicityModel.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: ethnicity.name },
                                    { code: ethnicity.code }
                                ]
                            },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                            { id: { [Op.ne]: id } }
                        ]
                    }
                })
                .then(ethnicities => ethnicities)
                .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al revisar la etnia.") }) : [];

            if (ethnicity_coincidence.length > 0) throw new EthnicityError("Ya existe una etnia con los datos proporcionados.");

            ethnicity_exist.set({
                name: ethnicity.name ?? ethnicity_exist.dataValues.name,
                code: ethnicity.code ?? ethnicity_exist.dataValues.code,
                hidden: ethnicity.hidden ?? ethnicity_exist.dataValues.hidden,
                updatedAt: Date.now(),
            });
            const updated = await ethnicity_exist.save()
                .then(ethnicity => ethnicity)
                .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al tratar de actualizar la etnia.") });

            return EthnicityPresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new EthnicityError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar la etnia.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        try {
            const ethnicity_exist = access.super_admin === true ? 
                await EthnicityModel.findOne({ where: { id: id } })
                    .then(ethnicity => ethnicity)
                    .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al revisar la etnia.") }) : 
                await EthnicityModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(ethnicity => ethnicity)
                    .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al revisar la etnia.") });

            if (!ethnicity_exist) throw new EthnicityError('La etnia no existe.');

            const contacts_affected = await ContactLanguageModel.count({ where: { language_id: id } })
                .then(count => count)
                .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al obtener los contactos afectados.") });

            ethnicity_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });
            await ethnicity_exist.save().catch((_error) => {throw new EthnicityError("Ha ocurrido un error al tratar de eliminar la etnia.")});
            return `La etnia ha sido eliminada. ${contacts_affected ? `${contacts_affected} contactos han sido afectados.` : ""}`;
        } catch (error) {
            if (error instanceof Error && error.message) throw new EthnicityError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar la etnia.");
        }
    }
    async findAll(access: IAccessPermission, ethnicity?: string): Promise<IEthnicityResponse[]> {
        try {
            const whereCondition: Record<string, any> = { user_id: access.user_id };

            if (access.super_admin === true) {
                delete whereCondition.user_id;
            }

            let nameOrCodeCondition: WhereOptions = {};

            if (ethnicity) {
                const ethnicityCondition = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${ethnicity}%` } },
                        { code: { [Op.like]: `%${ethnicity}%` } },
                    ],
                };

                nameOrCodeCondition = ethnicityCondition;
            }

            const ethnicities = await EthnicityModel.findAll({
                where: {
                    ...whereCondition,
                    ...nameOrCodeCondition,
                },
                ...ListCondition(access),
            });

            return ethnicities.map(ethnicity => EthnicityPresenter(ethnicity.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new EthnicityError(error.message);
            else throw new Error("Ha ocurrido un error al buscar las etnias.");
        }
    }
}
const ethnicityDao = new EthnicityDao();
export default ethnicityDao;