import { RoleError, UserError } from "../../../shared/errors";
import { Role, User } from "../../../shared/schemas";
import { UserUpdateInterface } from "../user.type";

export async function UpdateUser(id: string, data: UserUpdateInterface) {
    try {
        const user = await User.findOne({where: {id: id}}).catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')}).then(user => user);
        if (!user) throw new UserError(`El usuario con ID ${id} no existe.`);
        const role = data.role ? await Role.findOne({where: {name: data.role}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role) : null;
        if (data.role && !role) throw new RoleError(`El rol ${data.role} no existe.`);
        const check_email = data.email && (user.dataValues !== data.email) ? await User.findOne({where: {email: data.email}}).catch(_error => {throw new UserError('Ha ocurrido un error al revisar si el correo esta en uso.')}).then(user => user) : null;
        if (check_email && check_email.dataValues.id !== id) throw new UserError(`El correo ${data.email} ya esta en uso.`);
        user.set({
            first_name: data.first_name ?? user.dataValues.first_name,
            last_name: data.last_name ?? user.dataValues.last_name,
            email: data.email ?? user.dataValues.email,
            document_number: data.document_number ?? user.dataValues.document_number,
            document_type: data.document_type ?? user.dataValues.document_type,
            phone_number: data.phone_number ?? user.dataValues.phone_number,
            role_id: (data.role && role) && (role?.dataValues.id !== user.dataValues.role_id) ? role?.dataValues.id : user.dataValues.role_id,
            updatedAt: new Date(),
        });
        await user.save().catch(_error => {throw new UserError('Ha ocurrido un error al tratar de actualizar al usuario.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new UserError(error.message);
        else throw new Error('Ha ocurrido un error al actualizar al usuario.');
    }
}