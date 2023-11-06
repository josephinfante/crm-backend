import { ComponentError } from "../../../shared/errors";
import { Component } from "../../../shared/schemas";

export async function GetAllComponents() {
    try {
        const components = await Component.findAll().catch(_error => {throw new ComponentError('Ha ocurrido un error al revisar los componentes.')}).then(components => components);
        return components;
    } catch (error) {
        if (error instanceof Error && error.message) throw new ComponentError(error.message);
        else throw new Error('Ha ocurrido un error al obtener los componente.');
    }
}