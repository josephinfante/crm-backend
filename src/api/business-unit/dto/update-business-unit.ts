import { Op } from "sequelize";
import { BusinessUnitError } from "../../../shared/errors";
import { BusinessUnit } from "../../../shared/schemas";
import { UpdateBusinessUnitInterface } from "../business-unit.type";

export async function UpdateBusinessUnit(id: string, data: UpdateBusinessUnitInterface) {
    try {
        const business_unit = await BusinessUnit.findOne({ where : {id : id}}).catch(_error => { throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
        if (!business_unit) throw new BusinessUnitError(`La unidad de negocio con ID ${id} no existe.`);
        const business_unit_exists = await checkBusinessUnits(id, data);
        if (business_unit_exists.length) throw new BusinessUnitError(errorMessage(data));
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

async function checkBusinessUnits(id: string, data: {name: string, nickname: string, code: string}) {
    const whereCondition: {
        [key: string]: any;
    } = { id: { [Op.ne]: id } };
    
    if (data.name) {
        (whereCondition as any)[Op.or] = (whereCondition as any)[Op.or] || [];
        (whereCondition as any)[Op.or].push({ name: data.name });
    }
    
    if (data.nickname) {
        (whereCondition as any)[Op.or] = (whereCondition as any)[Op.or] || [];
        (whereCondition as any)[Op.or].push({ nickname: data.nickname });
    }
    
    if (data.code) {
        (whereCondition as any)[Op.or] = (whereCondition as any)[Op.or] || [];
        (whereCondition as any)[Op.or].push({ code: data.code });
    }
    const business_unit_exists = await BusinessUnit.findAll({
            where: whereCondition
        }).catch(_error => {throw new BusinessUnitError("Ha ocurrido un error al revisar la unidad de negocio.")}).then(business_unit => business_unit);
    return business_unit_exists;
}

function errorMessage(data: {name: string, nickname: string, code: string}) {
    return data.name && !data.nickname && !data.code ?
        `Ya existe una unidad de negocio con el nombre ${data.name}.` :
        data.nickname && !data.name && !data.code ?
            `Ya existe una unidad de negocio con el apodo ${data.nickname}.` :
            data.code && !data.name && !data.nickname ?
                `Ya existe una unidad de negocio con el código ${data.code}.` :
                'Ya existe una unidad de negocio con el nombre, apodo o código ingresado.';
}