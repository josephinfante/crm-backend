import { Op } from "sequelize";
import { BusinessUnit, Campus } from "../../../shared/schemas";
import { CreateCampusInterface } from "../campus.type";
import { BusinessUnitError, CampusError } from "../../../shared/errors";
import { UniqueID } from "../../../shared/utils";

export async function CreateCampus(data: CreateCampusInterface) {
    try {
        const campus = await Campus.findAll({
            where: {
                [Op.or] : [
                    {name: data.name},
                    {nickname: data.nickname},
                    {code: data.code},
                ]
            }
        }).catch(_error => { throw new CampusError("Ha ocurrido un error al revisar la sede.")}).then(campus => campus);
        if (campus.length > 0) throw new CampusError(`La sede con nombre ${data.name} o con nickname ${data.nickname} o con código ${data.code} ya existe.`);
        const business_unit = await BusinessUnit.findOne({ where : {name: data.business_unit}}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        if (!business_unit) throw new BusinessUnitError(`La unidad de negocio ${data.business_unit} no existe.`);
        await Campus.create({
            id: UniqueID.generate(),
            name: data.name,
            nickname: data.nickname,
            code: data.code,
            business_unit_id: business_unit.dataValues.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => { throw new CampusError("Ha ocurrido un error al tratar de crear la sede.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new CampusError(error.message);
        else throw new Error("Ha ocurrido un error al crear la sede.");
    }
}