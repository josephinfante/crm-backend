import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { Language } from "../../domain/language/language";
import { LanguageModel } from "../../shared/models";
import { UniqueID, ListCondition } from "../../shared/utils";
import { ContactDegreeError, LanguageError } from "../../shared/errors";
import { ILanguageResponse, LanguagePresenter } from "../../interfaces/presenters/language.presenter";
import { ContactLanguageModel } from "../../shared/models/contact-language.model";

class LanguageDao {
    async create(access: IAccessPermission, language: Language): Promise<ILanguageResponse> {
        try {
            const new_language = {
                id: UniqueID.generate(),
                name: language.name,
                code: language.code,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: access.user_id,
            }
            const [_language, created] = await LanguageModel.findOrCreate({
                    where: {
                        [Op.or]: [
                            { name: language.name },
                            { code: language.code },
                        ]
                    },
                    defaults: new_language,
                })
                .then(language => language)
                .catch((_error) => { throw new LanguageError("Ha ocurrido un error al tratar de crear el idioma.") })

            if (!created) throw new LanguageError("El idioma ya existe.")

            return LanguagePresenter(new_language, access)
        } catch (error) {
            if (error instanceof Error && error.message) throw new LanguageError(error.message);
            else throw new Error("Ha ocurrido un error al crear el idioma.");
        }
    }
    async update(access: IAccessPermission, id: string, language: Language): Promise<ILanguageResponse> {
        try {
            const language_exist = access.super_admin === true ? 
                await LanguageModel.findOne({ where: { id: id } })
                    .then(language => language)
                    .catch((_error) => { throw new LanguageError("Ha ocurrido un error al revisar el idioma.") }) : 
                await LanguageModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(language => language)
                    .catch((_error) => { throw new LanguageError("Ha ocurrido un error al revisar el idioma.") });

            if (!language_exist) throw new LanguageError("El idioma no existe.");

            const language_coincidence = (language.name !== language_exist.dataValues.name || language.code !== language_exist.dataValues.code) ? await LanguageModel.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { name: language.name },
                                    { code: language.code }
                                ]
                            },
                            ...(access.super_admin === false ? [{ user_id: access.user_id }] : []),
                            { id: { [Op.ne]: id } }
                        ]
                    }
                })
                .then(languages => languages)
                .catch((_error) => { throw new LanguageError("Ha ocurrido un error al revisar el idioma.") }) : [];

            if (language_coincidence.length > 0) throw new LanguageError("Ya existe un idioma con los datos proporcionados.");

            language_exist.set({
                name: language.name ?? language_exist.dataValues.name,
                code: language.code ?? language_exist.dataValues.code,
                hidden: language.hidden ?? language_exist.dataValues.hidden,
                updatedAt: Date.now(),
            });
            const updated = await language_exist.save()
                .then(language => language)
                .catch((_error) => { throw new LanguageError("Ha ocurrido un error al actualizar el idioma.") });

            return LanguagePresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new LanguageError(error.message);
            else throw new Error("Ha ocurrido un error al actualizar el idioma.");
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        try {
            const language_exist = access.super_admin === true ? 
                await LanguageModel.findOne({ where: { id: id } })
                    .then(language => language)
                    .catch((_error) => { throw new LanguageError("Ha ocurrido un error al revisar el idioma.") }) : 
                await LanguageModel.findOne({ where: { id: id, user_id: access.user_id} })
                    .then(language => language)
                    .catch((_error) => { throw new LanguageError("Ha ocurrido un error al revisar el idioma.") });

            if (!language_exist) throw new LanguageError("El idioma no existe.");

            const contacts_affected = await ContactLanguageModel.count({ where: { language_id: id } })
                .then(count => count)
                .catch((_error) => { throw new ContactDegreeError("Ha ocurrido un error al obtener los contactos afectados.") });
            
            language_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            });
            await language_exist.save().catch((_error) => { throw new LanguageError("Ha ocurrido un error al eliminar el idioma.") });
            return `El idioma ha sido eliminado. ${contacts_affected ? `${contacts_affected} contactos han sido afectados.` : ""}`
        } catch (error) {
            if (error instanceof Error && error.message) throw new LanguageError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el idioma.");
        }
    }
    async findAll(access: IAccessPermission, language?: string): Promise<ILanguageResponse[]> {
        try {
            const whereCondition: Record<string, any> = { user_id: access.user_id };

            if (access.super_admin === true) {
                delete whereCondition.user_id;
            }

            let nameOrCodeCondition: WhereOptions = {};

            if (language) {
                const languageCondition = {
                    [Op.or]: [
                        { name: { [Op.like]: `%${language}%` } },
                        { code: { [Op.like]: `%${language}%` } },
                    ],
                };

                nameOrCodeCondition = languageCondition;
            }

            const languages = await LanguageModel.findAll({
                where: {
                    ...whereCondition,
                    ...nameOrCodeCondition,
                },
                ...ListCondition(access),
            });

            return languages.map(language => LanguagePresenter(language.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new LanguageError(error.message);
            else throw new Error("Ha ocurrido un error al buscar los idiomas.");
        }
    }
}
const languageDao = new LanguageDao();
export default languageDao;