import { ComponentError } from "../../../shared/errors";
import { Component } from "../../../shared/schemas";
import { UniqueID } from "../../../shared/utils";

export async function CreateComponent(component: {name: string}) {
    try {
        const component_exists = await Component.findOne({where: {name: component.name}}).catch(_error => {throw new ComponentError('Ha ocurrido un error al revisar el componente')}).then(component => component);
        if (component_exists) throw new ComponentError(`El componente ${component.name} ya existe.`);
        await Component.create({
            id: UniqueID.generate(),
            name: component.name,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => {throw new ComponentError('Ha ocurrido un error al tratar de crear el componente.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new ComponentError(error.message);
        else throw new Error('Ha ocurrido un error al crear el componente.');
    }
}