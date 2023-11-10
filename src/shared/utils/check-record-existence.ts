import { Op } from "sequelize";

export async function checkRecordExistence(modelInstance: any, id: string, data: {name: string, nickname: string, code: string}, CustomError: any, ErrorMessage: string) {
    if (!data.name && !data.nickname && !data.code) return [];
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
    const record_exists = await modelInstance.findAll({
            where: whereCondition
        }).catch((_error: any) => {throw new CustomError(ErrorMessage)}).then((records: any) => records);
    return record_exists;
}

export function errorMessage(model_name: string, data: {name: string, nickname: string, code: string}) {
    return data.name && !data.nickname && !data.code ?
        `Ya existe ${model_name} con el nombre ${data.name}.` :
        data.nickname && !data.name && !data.code ?
            `Ya existe ${model_name} con el apodo ${data.nickname}.` :
            data.code && !data.name && !data.nickname ?
                `Ya existe ${model_name} con el código ${data.code}.` :
                `Ya existe ${model_name} con el nombre, apodo o código ingresado.`;
}