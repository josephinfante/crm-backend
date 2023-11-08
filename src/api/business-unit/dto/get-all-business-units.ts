import { BusinessUnitError } from "../../../shared/errors";
import { BusinessUnit } from "../../../shared/schemas";

export async function GetAllBusinessUnits() {
    try {
        const business_units = await BusinessUnit.findAll().catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        return business_units;
    } catch (error) {
        if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
        else throw new Error("Ha ocurrido un error al obtener las unidades de negocio.");
    }
}