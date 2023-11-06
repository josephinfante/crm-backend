import { ComponentError } from "../../../shared/errors";
import { Component } from "../../../shared/schemas";

export async function GetComponent(id: string) {
    try {
        const component = await Component.findOne({where: {id: id}}).catch(_error => {throw new ComponentError('Ha ocurrido un error al revisar el componente.')}).then(component => component);
        if (!component) throw new ComponentError(`El componente con ID ${id} no existe.`);
        return component;
    } catch (error) {
        if (error instanceof Error && error.message) throw new ComponentError(error.message);
        else throw new Error('Ha ocurrido un error al obtener el componente.');
    }
}