import { ComponentError } from "../shared/errors";
import { ComponentModel } from "../shared/models";
import { UniqueID } from "../shared/utils";

const components_data = [
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

async function ComponentsMigration() {
    try {
        const components = components_data.map(country => ({
            id: UniqueID.generate(),
            name: country.name,
            internal_url: country.name,
            external_url: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }));
        await ComponentModel.bulkCreate(components).catch(_error => { throw new ComponentError('Ha ocurrido un error al tratar de insertar los componentes.') });
    } catch (error) {
        if (error instanceof Error && error.message) throw new ComponentError(error.message);
        else throw new Error('Ha ocurrido un error al tratar de insertar los componentes ejecutando la migración.');
    }
}

ComponentsMigration();