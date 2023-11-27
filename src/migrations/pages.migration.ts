import { PageError } from "../shared/errors";
import { PageModel } from "../shared/models";
import { UniqueID } from "../shared/utils";

const pages_data = [
    {name: 'user'},
    {name: 'semester'},
    {name: 'school'},
    {name: 'role'},
    {name: 'page'},
    {name: 'opportunity'},
    {name: 'nationality'},
    {name: 'language'},
    {name: 'ethnicity'},
    {name: 'degree-specification'},
    {name: 'degree'},
    {name: 'country'},
    {name: 'contact-language'},
    {name: 'contact-degree'},
    {name: 'contact-channel'},
    {name: 'contact'},
    {name: 'component'},
    {name: 'college'},
    {name: 'career'},
    {name: 'campus'},
    {name: 'business-unit'},
]

async function pagesMigration() {
    try {
        const pages = pages_data.map(country => ({
            id: UniqueID.generate(),
            name: country.name,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }));
        PageModel.bulkCreate(pages).catch(_error => { throw new PageError('Ha ocurrido un error al tratar de insertar las páginas.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new PageError(error.message);
        else throw new Error('Ha ocurrido un error al tratar de insertar las páginas ejecutando la migración.');
    }
}

pagesMigration();