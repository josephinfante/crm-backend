import { languages_data } from "../shared/data";
import { LanguageError } from "../shared/errors";
import { LanguageModel } from "../shared/models";
import { UniqueID } from "../shared/utils";

async function LanguageMigration() {
    try {
        const languages = languages_data.map(language => ({
            id: UniqueID.generate(),
            name: language.name,
            code: language.code,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }));
        LanguageModel.bulkCreate(languages).catch(_error => { throw new LanguageError('Ha ocurrido un error al tratar de insertar los idiomas.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new LanguageError(error.message);
        else throw new Error('Ha ocurrido un error al tratar de insertar los idiomas ejecutando la migración.');
    }
}

LanguageMigration();