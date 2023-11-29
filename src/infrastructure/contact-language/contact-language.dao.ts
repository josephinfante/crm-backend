import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { ContactLanguage } from "../../domain/contanct-language/contact-language";
import { UniqueID } from "../../shared/utils";
import { ContactLanguageError } from "../../shared/errors";
import { ContactLanguageModel } from "../../shared/models";

export async function CreateContactLanguage(access: IAccessPermission, contact_language: ContactLanguage) {
    try {
        const new_contact_language = {
            id: UniqueID.generate(),
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
            .catch((_error) => { throw new ContactLanguageError("Ha ocurrido un error al tratar de crear el idioma del contacto.") });
        if (!created) throw new ContactLanguageError('El idioma del contacto con los datos proporcionados ya existe.');
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