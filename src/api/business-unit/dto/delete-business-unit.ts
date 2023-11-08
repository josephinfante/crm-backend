import { Op, col, where } from "sequelize";
import { BusinessUnitError } from "../../../shared/errors";
import { BusinessUnit } from "../../../shared/schemas";
import { Campus } from "../../../shared/schemas/campus.schema";
import { School } from "../../../shared/schemas/school.schema";
import { Semester } from "../../../shared/schemas/semester.schema";

export async function DeleteBusinessUnit(id: string) {
    try {
        const business_unit = await BusinessUnit.findOne({ where : {id : id}}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        if (!business_unit) throw new BusinessUnitError(`La unidad de negocio con ID ${id} no existe.`);
        const business_unit_exists = await BusinessUnit.findAll({
            where: {
                [Op.or]: [
                  { id: id },
                  where(col('schools.business_unit_id'), '=', id),
                  where(col('campuses.business_unit_id'), '=', id),
                  where(col('semesters.business_unit_id'), '=', id),
                ],
              },
              include: [
                {
                  model: School,
                  as: 'schools',
                },
                {
                  model: Campus,
                  as: 'campuses',
                },
                {
                  model: Semester,
                  as: 'semesters',
                },
            ],
        }).catch(_error => {throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        const schools_count = business_unit_exists[0].dataValues.schools.length;
        const campuses_count = business_unit_exists[0].dataValues.campuses.length;
        const semesters_count = business_unit_exists[0].dataValues.semesters.length;
        if (schools_count > 0 || campuses_count > 0 || semesters_count > 0) throw new BusinessUnitError(`La unidad de negocio '${business_unit.dataValues.name}' no puede ser eliminada porque tiene ${schools_count} escuelas profesionales, ${campuses_count} campus y ${semesters_count} semestres asociados.`);
        await business_unit.destroy().catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al tratar de eliminar la unidad de negocio.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new BusinessUnitError(error.message);
        else throw new Error("Ha ocurrido un error al eliminar la unidad de negocio.");
    }
}