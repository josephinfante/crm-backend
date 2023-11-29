import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { UniqueID, ListCondition } from "../../shared/utils";
import { ContactError, CountryError } from "../../shared/errors";
import { Country } from "../../domain/country/country";
import { CountryPresenter, ICountryResponse } from "../../interfaces/presenters/country.presenter";
import { ContactModel, CountryModel } from "../../shared/models";

class CountryDao {
    async create(access: IAccessPermission, country: Country): Promise<ICountryResponse> {
        try {
            const new_country = {
                id: UniqueID.generate(),
                name: country.name,
                code: country.code,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: access.user_id,
            }
            const [_country, created] = await CountryModel.findOrCreate({
                    where: {
                        [Op.or]: [
                            { name: country.name },
                            { code: country.code },
                        ]
                    },
                    defaults: new_country,
                })
                .then(country => country)
                .catch((_error) => { throw new CountryError("Ha ocurrido un error al tratar de crear el país.") })

            if (!created) throw new CountryError("El país ya existe.")

            return CountryPresenter(new_country, access)
        } catch (error) {
            if (error instanceof Error && error.message) throw new CountryError(error.message);
            else throw new Error("Ha ocurrido un error al crear el país.");
        }
    }
    async update(access: IAccessPermission, id: string, country: Country): Promise<ICountryResponse> {
        try {
            const country_exist = access.super_admin === true ? 
                await CountryModel.findOne({ where: { id: id } })
                    .then(country => country)
                    .catch((_error) => { throw new CountryError("Ha ocurrido un error al revisar el país.") }) : 
                await CountryModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(country => country)
                    .catch((_error) => { throw new CountryError("Ha ocurrido un error al revisar el país.") });

            if (!country_exist) throw new CountryError("El país no existe.");

            const country_coincidence = (country.name !== country_exist.dataValues.name || country.code !== country_exist.dataValues.code) ? await CountryModel.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: country.name },
                                    { code: country.code }
                                ]
                            },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                            { id: { [Op.ne]: id } }
                        ]
                    }
                })
                .then(countries => countries)
                .catch((_error) => { throw new CountryError("Ha ocurrido un error al revisar el país.") }) : [];

            if (country_coincidence.length > 0) throw new CountryError("Ya existe un país con los datos proporcionados.");

            country_exist.set({
                name: country.name ?? country_exist.dataValues.name,
                code: country.code ?? country_exist.dataValues.code,
                hidden: country.hidden ?? country_exist.dataValues.hidden,
                updatedAt: Date.now(),
            });
            const updated = await country_exist.save()
                .then(country => country)
                .catch((_error) => { throw new CountryError("Ha ocurrido un error al actualizar el país.") });

            return CountryPresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new CountryError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el país.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        try {
            const country_exist = access.super_admin === true ? 
                await CountryModel.findOne({ where: { id: id } })
                    .then(country => country)
                    .catch((_error) => { throw new CountryError("Ha ocurrido un error al revisar el país.") }) : 
                await CountryModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(country => country)
                    .catch((_error) => { throw new CountryError("Ha ocurrido un error al revisar el país.") });

            if (!country_exist) throw new CountryError("El país no existe.");

            const contacts_affected = await ContactModel.count({ where: { country_id: id } })
                .then(count => count)
                .catch((_error) => { throw new ContactError("Ha ocurrido un error al obtener los contactos afectados.") });
            
            country_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });
            await country_exist.save().catch((_error) => { throw new CountryError("Ha ocurrido un error al eliminar el país.") });
            return `El país ha sido eliminado. ${contacts_affected ? `${contacts_affected} contactos han sido afectados.` : ""}`
        } catch (error) {
            if (error instanceof Error && error.message) throw new CountryError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el país.");
        }
    }
    async findAll(access: IAccessPermission, country?: string): Promise<ICountryResponse[]> {
        try {
            const whereCondition: Record<string, any> = { user_id: access.user_id };

            if (access.super_admin === true) {
                delete whereCondition.user_id;
            }

            let nameOrCodeCondition: WhereOptions = {};

            if (country) {
                const countryCondition = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${country}%` } },
                        { code: { [Op.like]: `%${country}%` } },
                    ],
                };

                nameOrCodeCondition = countryCondition;
            }

            const countries = await CountryModel.findAll({
                where: {
                    ...whereCondition,
                    ...nameOrCodeCondition,
                },
                ...ListCondition(access),
            });

            return countries.map(country => CountryPresenter(country.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new CountryError(error.message);
            else throw new Error("Ha ocurrido un error al buscar los países.");
        }
    }
}
const countryDao = new CountryDao();
export default countryDao;