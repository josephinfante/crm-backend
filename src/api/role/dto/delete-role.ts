import { RoleError, UserError } from "../../../shared/errors";
import { Role, User } from "../../../shared/schemas";

export async function DeleteRole(id: string) {
    try {
        const role = await Role.findOne({where: {id: id}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}).then(role => role);
        if (!role) throw new Error(`El rol con ID ${id} no existe.`);
        const usersWithRole = await User.findAll({where: {role_id: id}}).catch(_error => {throw new UserError(`Ha ocurrido un error al revisar si hay usuario con el rol ${role.dataValues.name}.`)}).then(users => users);
        if (usersWithRole.length > 0) throw new RoleError(`El rol ${role.dataValues.name} no puede ser eliminado porque hay usuarios con ese rol.`);
        await role.destroy().catch(_error => {throw new RoleError('Ha ocurrido un error al tratar de eliminar el rol.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new RoleError(error.message);
        else throw new Error('Ha habido un error al eliminar el rol.');
    }
}