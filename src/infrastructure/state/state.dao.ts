import { StateError } from "../../shared/errors";
import { StateModel } from "../../shared/models";

export async function FindAllStates () {
    try {
        const states = await StateModel.findAll()
            .then(states => states.map(state => {
                return {
                    id: state.dataValues.id,
                    name: state.dataValues.name,
                    code: state.dataValues.code,
                    hidden: state.dataValues.hidden,
                    deleted: state.dataValues.deleted,
                    createdAt: state.dataValues.createdAt,
                    updatedAt: state.dataValues.updatedAt,
                };
            }))
            .catch(_error => { throw new StateError("Ha ocurrido un error al tratar de buscar los departamentos del Perú.") });
        return states;
    } catch (error) {
        if (error instanceof Error && error.message) throw new StateError(error.message);
        else throw new Error("Ha ocurrido un error al buscar los departamentos del Perú.");
    }
}