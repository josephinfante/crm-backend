import { Op } from "sequelize";
import { BusinessUnitError } from "../../../shared/errors";
import { BusinessUnit } from "../../../shared/schemas";
import { CreateBusinessUnitInterface } from "../business-unit.type";
import { UniqueID } from "../../../shared/utils";

export async function CreateBusinessUnit(data: CreateBusinessUnitInterface) {
    try {
        const business_unit = await BusinessUnit.findAll({
            where: {
                [Op.or] : [
                    {name: data.name},
                    {nickname: data.nickname},
                    {code: data.code},
                ]
            }
        }).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        if (business_unit.length) throw new BusinessUnitError(`La unidad de negocio con nombre ${data.name} o con nickname ${data.nickname} o con código ${data.code} ya existe.`);
        await BusinessUnit.create({
            id: UniqueID.generate(),
            name: data.name,
            nickname: data.nickname,
            code: data.code,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al tratar de crear la unidad de negocio.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
        else throw new Error("Ha ocurrido un error al crear la unidad de negocio.");
    }
}