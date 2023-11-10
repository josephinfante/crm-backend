import { Op } from "sequelize";
import { BusinessUnitError, SemesterError } from "../../../shared/errors";
import { BusinessUnit, Semester } from "../../../shared/schemas";
import { CreateSemesterInterface } from "../semester.type";
import { UniqueID } from "../../../shared/utils";

export async function CreateSemester(data: CreateSemesterInterface) {
    try {
        const semester = await Semester.findAll({
            where: {
                [Op.or] : [
                    {name: data.name},
                    {nickname: data.nickname},
                    {code: data.code},
                ]
            }
        }).catch(_error => { throw new SemesterError("Ha ocurrido un error al revisar el semestre académico.")}).then(semester => semester);
        if (semester.length > 0) throw new SemesterError(`El semestre académico con nombre ${data.name} o con nickname ${data.nickname} o con código ${data.code} ya existe.`);
        const business_unit = await BusinessUnit.findOne({ where : {name: data.business_unit}}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        if (!business_unit) throw new BusinessUnitError(`La unidad de negocio ${data.business_unit} no existe.`);
        await Semester.create({
            id: UniqueID.generate(),
            name: data.name,
            nickname: data.nickname,
            code: data.code,
            business_unit_id: business_unit.dataValues.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => { throw new SemesterError("Ha ocurrido un error al tratar de crear el semestre académico.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new SemesterError(error.message);
        else throw new Error("Ha ocurrido un error al crear el semestre académico.");
    }
}