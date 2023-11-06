import { RoleError, UserError } from "../../../shared/errors";
import { Role, User } from "../../../shared/schemas";
import { UniqueID, encrypt_password } from "../../../shared/utils";
import { UserCreateInterface } from "../user.type";

export async function CreateUser(user: Omit<UserCreateInterface, "id">) {
    try {
        const emailInUse = await User.findOne({where: {email: user.email}}).catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')}).then(user => user);
        if (emailInUse) throw new UserError(`El correo ${user.email} ya esta en uso.`);
        const role = await Role.findOne({where: {name: user.role}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role);
        if (!role) throw new RoleError(`El rol ${user.role} no existe.`);
        const encrypted_password = await encrypt_password(user.password);
        await User.create({
            id: UniqueID.generate(),
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: encrypted_password,
            document_type: user.document_type,
            document_number: user.document_number,
            phone_number: user.phone_number,
            role_id: role.dataValues.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).catch(_error => {throw new UserError('Ha ocurrido un error al tratar de crear al usuario.')});
    }
    catch (error) {
        if (error instanceof Error && error.message) throw new UserError(error.message);
        else throw new Error('Ha ocurrido un error al crear al ususario.');
    }
}