import { Op } from "sequelize";
import { CreateSchoolInterface } from "../school.type";
import { BusinessUnitError, SchoolError } from "../../../shared/errors";
import { UniqueID } from "../../../shared/utils";
import { BusinessUnit, School } from "../../../shared/schemas";

export async function CreateSchool(data: CreateSchoolInterface) {
    try {
        const school = await School.findAll({
            where: {
                [Op.or] : [
                    {name: data.name},
                    {nickname: data.nickname},
                    {code: data.code},
                ]
            }
        }).catch(_error => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.")}).then(school => school);
        if (school.length > 0) throw new SchoolError(`La escuela profesional con nombre ${data.name} o con nickname ${data.nickname} o con código ${data.code} ya existe.`);
        const business_unit = await BusinessUnit.findOne({ where : {name: data.business_unit}}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        if (!business_unit) throw new BusinessUnitError(`La unidad de negocio ${data.business_unit} no existe.`);
        await School.create({
            id: UniqueID.generate(),
            name: data.name,
            nickname: data.nickname,
            code: data.code,
            business_unit_id: business_unit.dataValues.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => { throw new SchoolError("Ha ocurrido un error al tratar de crear la escuela profesional.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new SchoolError(error.message);
        else throw new Error("Ha ocurrido un error al crear la escuela profesional.");
    }
}