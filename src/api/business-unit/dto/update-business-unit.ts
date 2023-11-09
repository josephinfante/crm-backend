// import { Op } from "sequelize";
import { BusinessUnitError } from "../../../shared/errors";
import { BusinessUnit } from "../../../shared/schemas";
import { UpdateBusinessUnitInterface } from "../business-unit.type";
import { checkRecordExistence, errorMessage } from "../../../shared/utils/check-record-existence";

export async function UpdateBusinessUnit(id: string, data: UpdateBusinessUnitInterface) {
    try {
        const business_unit = await BusinessUnit.findOne({ where : {id : id}}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        if (!business_unit) throw new BusinessUnitError(`La unidad de negocio con ID ${id} no existe.`);
        const business_unit_exists = await checkRecordExistence(BusinessUnit, id, data, BusinessUnitError);
        if (business_unit_exists.length) throw new BusinessUnitError(errorMessage('una unidad de negocio', data));
        business_unit.set({
            name: data.name ?? business_unit.dataValues.name,
            nickname: data.nickname ?? business_unit.dataValues.nickname,
            code: data.code ?? business_unit.dataValues.code,
            updatedAt: new Date(),
        });
        await business_unit.save().catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al tratar de actualizar la unidad de negocio.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
        else throw new Error("Ha ocurrido un error al actualizar la unidad de negocio.");
    }
}