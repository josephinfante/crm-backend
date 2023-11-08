import { BusinessUnitError } from "../../../shared/errors";
import { BusinessUnit } from "../../../shared/schemas";

export async function GetBusinessUnit(id: string) {
    try {
        const business_unit = await BusinessUnit.findOne({ where : {id : id}}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        if (!business_unit) throw new BusinessUnitError(`La unidad de negocio con ID ${id} no existe.`);
        return business_unit;
    } catch (error) {
        if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
        else throw new Error("Ha ocurrido un error al obtener la unidad de negocio.");
    }
}