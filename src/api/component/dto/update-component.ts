import { ComponentError } from "../../../shared/errors";
import { Component } from "../../../shared/schemas";

export async function UpdateComponent(id: string, data: {name: string}) {
    try {
        const component = await Component.findOne({where: {id: id}}).catch(_error => {throw new ComponentError('Ha ocurrido un error al revisar el componente.')}).then(component => component);
        if (!component) throw new ComponentError(`El componente con ID ${id} no existe.`);
        component.set({
            name: data.name ?? component.dataValues.name,
            updatedAt: new Date(),
        });
        await component.save().catch(_error => {throw new ComponentError('Ha ocurrido un error al tratar de actualizar el componente.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new ComponentError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar el componente.');
    }
}