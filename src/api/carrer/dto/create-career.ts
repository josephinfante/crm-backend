import { Op } from "sequelize";
import { CareerError, SchoolError } from "../../../shared/errors";
import { Career, School } from "../../../shared/schemas";
import { CreateCareerInterface } from "../career.type";
import { UniqueID } from "../../../shared/utils";

export async function CreateCareer(data: CreateCareerInterface) {
    try {
        const career = await Career.findAll({
            where: {
                [Op.or] : [
                    {name: data.name},
                    {nickname: data.nickname},
                    {code: data.code},
                ]
            }
        }).catch(_error => { throw new CareerError("Ha ocurrido un error al revisar la carrera.")}).then(career => career);
        if (career.length > 0) throw new CareerError(`La carrera con nombre ${data.name} o con nickname ${data.nickname} o con código ${data.code} ya existe.`);
        const school = await School.findOne({ where : {name: data.school}}).catch(_error => { throw new SchoolError("Ha ocurrido un error al revisar la escuela profesional.")}).then(school => school);
        if (!school) throw new SchoolError(`La escuela profesional '${data.school}' no existe.`);
        await Career.create({
            id: UniqueID.generate(),
            name: data.name,
            nickname: data.nickname,
            code: data.code,
            school_id: school.dataValues.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => { throw new CareerError("Ha ocurrido un error al tratar de crear la carrera.")});
    } catch (error) {
        if (error instanceof Error && error.message) throw new CareerError(error.message);
        else throw new Error("Ha ocurrido un error al crear la carrera.");
    }
}