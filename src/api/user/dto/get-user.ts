import { UserError } from "../../../shared/errors";
import { Role, User } from "../../../shared/schemas";

export async function GetUser(id: string) {
    try {
        const user = await User.findOne({
            where: {id: id},
            include: [{ model: Role, attributes: ['name'] }],
        }).catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')}).then(user => user);
        if (!user) throw new UserError(`El usuario con ID ${id} no existe.`);
        delete user.dataValues.password;
        return {
            id: user.dataValues.id,
            first_name: user.dataValues.first_name,
            last_name: user.dataValues.last_name,
            email: user.dataValues.email,
            document_type: user.dataValues.document_type,
            document_number: user.dataValues.document_number,
            phone_number: user.dataValues.phone_number,
            role: user.dataValues.role.dataValues.name,
            updatedAt: user.dataValues.updatedAt,
            createdAt: user.dataValues.createdAt,
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new UserError(error.message);
        else throw new Error('Ha ocurrido un error al obtener al usuario.');
    }
}