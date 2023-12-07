import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { ContactLanguage } from "../../domain/contanct-language/contact-language";
import { UniqueID } from "../../shared/utils";
import { ContactLanguageError } from "../../shared/errors";
import { ContactLanguageModel, LanguageModel } from "../../shared/models";
import { ContactLanguagePresenter } from "../../interfaces/presenters/contact-language.presenter";
import { ICreateContactLanguage } from "../../domain/contanct-language/contact-language.type";

export async function CreateContactLanguage(access: IAccessPermission, contact_language: ICreateContactLanguage) {
    try {
        const language_exist = await LanguageModel.findByPk(contact_language.language_id)
            .then(language => language)
            .catch((_error) => { throw new ContactLanguageError("Ha ocurrido un error al revisar el idioma.") });
        if (!language_exist) throw new ContactLanguageError("El idioma no existe.");

        const new_contact_language = {
            id: UniqueID.generate(),
            native: contact_language.native,
            level: contact_language.level,
            read: contact_language.read,
            speak: contact_language.speak,
            listen: contact_language.listen,
            hidden: false,
            deleted: false,
            updatedAt: Date.now(),
            createdAt: Date.now(),
            language_id: contact_language.language_id,
            contact_id: contact_language.contact_id,
            user_id: access.user_id,
        }
        const [_contact_language, created] = await ContactLanguageModel.findOrCreate({
                where: {
                    [Op.and]: [
                        { language_id: contact_language.language_id },
                        { contact_id: contact_language.contact_id },
                    ]
                    
                },
                defaults: new_contact_language
            })
            .then(contact_language => contact_language)
            .catch((_error) => { throw new ContactLanguageError(_error.message??"Ha ocurrido un error al tratar de crear el idioma del contacto.") });
        if (!created) throw new ContactLanguageError('El idioma del contacto con los datos proporcionados ya existe.');
        return ContactLanguagePresenter(new_contact_language, language_exist.dataValues);
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactLanguageError(error.message);
        else throw new Error("Ha ocurrido un error al crear el idioma del contacto.");
    }
}

export async function UpdateContactLanguage(access: IAccessPermission, contact_language: ContactLanguage) {
    try {
        const contact_language_exist = access.super_admin === true ?
                await ContactLanguageModel.findOne({ where: { contact_id: contact_language.contact_id, language_id: contact_language.language_id } })
                    .then(contact_language => contact_language)
                    .catch((_error) => { throw new ContactLanguageError("Ha ocurrido un error al revisar el idioma del contacto.") }) : 
                await ContactLanguageModel.findOne({ where: { contact_id: contact_language.contact_id, language_id: contact_language.language_id, user_id: access.user_id} })
                    .then(contact_language => contact_language)
                    .catch((_error) => { throw new ContactLanguageError("Ha ocurrido un error al revisar el idioma del contacto.") });

        if (contact_language_exist) {
            const contact_language_coincidence = (contact_language.level !== contact_language_exist.dataValues.level || contact_language.speak !== contact_language_exist.dataValues.speak || contact_language.read !== contact_language_exist.dataValues.read || contact_language.listen !== contact_language_exist.dataValues.listen || contact_language.language_id !== contact_language_exist.dataValues.language_id) ? 
                await ContactLanguageModel.findAll({
                        where: {
                            [Op.and]: [
                                { language_id: contact_language.language_id },
                                { contact_id: contact_language.contact_id }
                            ]
                        }
                    })
                    .then(contact_languages => contact_languages)
                    .catch((_error) => { throw new ContactLanguageError("Ha ocurrido un error al revisar los idiomas del contacto.") }) : [];

            if (contact_language_coincidence.length > 0) throw new ContactLanguageError("El idioma del contacto con los datos proporcionados ya existe.");
            await contact_language_exist.destroy()
                .catch((_error) => {throw new ContactLanguageError("Ha ocurrido un error al tratar de eliminar el idioma del contacto.")});
            await CreateContactLanguage(access, contact_language);
        }
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactLanguageError(error.message);
        else throw new Error("Ha ocurrido un error al actualizar el idioma del contacto.");
    }
}

export async function DeleteLanguagesByContactId(access: IAccessPermission, contact_id: string) {
    try {
        access.super_admin === true ? 
            await ContactLanguageModel.destroy({ where: { contact_id: contact_id } })
                .catch((_error) => { throw new ContactLanguageError("Ha ocurrido un error al tratar eliminar los idiomas del contacto.") }) :
            await ContactLanguageModel.destroy({ where: { contact_id: contact_id, user_id: access.user_id } })
                .catch((_error) => { throw new ContactLanguageError("Ha ocurrido un error al tratar eliminar los idiomas del contacto.") });
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactLanguageError(error.message);
        else throw new Error("Ha ocurrido un error al eliminar los idiomas del contacto.");
    }
}

export async function FindLanguagesByContactId(contact_id: string) {
    try {
        const contact_languages = await ContactLanguageModel.findAll({ 
                where: { contact_id: contact_id },
                include: [{ model: LanguageModel }]
            })
            .then(contact_languages => contact_languages)
            .catch((_error) => { throw new ContactLanguageError("Ha ocurrido un error al revisar los idiomas del contacto.") });

        return contact_languages.map(contact_language => ContactLanguagePresenter(contact_language.dataValues, contact_language.dataValues.language.dataValues));
    } catch (error) {
        if (error instanceof Error && error.message) throw new ContactLanguageError(error.message);
        else throw new Error("Ha ocurrido un error al buscar los idiomas del contacto.");
    }
}