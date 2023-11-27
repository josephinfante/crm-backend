import { Component } from "../../domain/component/component";
import { ComponentError } from "../../shared/errors";
import { ComponentModel } from "../../shared/models/component.model";

export async function FindComponentById(id: string): Promise<Component> {
    try {
        const component = await ComponentModel.findOne({ where: { id : id }})
            .then(component => component)
            .catch(_error => { throw new ComponentError('Ha ocurrido un error al revisar el componente')});
        if (!component) throw new ComponentError(`El componente con ID ${id} no existe`);
        return {
            id: component.dataValues.id,
            name: component.dataValues.name,
            createdAt: component.dataValues.createdAt,
            updatedAt: component.dataValues.updatedAt,
        };
    } catch (error) {
        if (error instanceof ComponentError) throw new ComponentError(error.message);
        else throw new ComponentError('Ha ocurrido un error al obtener el componente');
    }
}

export async function FindAllComponents(): Promise<Component[]> {
    try {
        const components = await ComponentModel.findAll()
            .then(components => components)
            .catch(_error => { throw new ComponentError('Ha ocurrido un error al revisar los componentes')});
        return components.map(component => ({
            id: component.dataValues.id,
            name: component.dataValues.name,
            createdAt: component.dataValues.createdAt,
            updatedAt: component.dataValues.updatedAt,
        }));
    } catch (error) {
        if (error instanceof ComponentError) throw new ComponentError(error.message);
        else throw new ComponentError('Ha ocurrido un error al obtener los componentes');
    }
}