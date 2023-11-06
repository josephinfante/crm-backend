import { UserError } from "../../../shared/errors";
import { User } from "../../../shared/schemas";

export async function DeleteUser(id: string) {
    try {
        const user = await User.findOne({where: {id: id}}).catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')}).then(user => user);
        if (!user) throw new UserError(`El usuario con ID ${id} no existe.`);
        await User.destroy({where: {id: id}}).catch(_error => {throw new UserError('Ha ocurrido un error al tratar de eliminar al usuario.')});
    } catch (error) {
        if (error instanceof Error && error.message) throw new UserError(error.message);
        else throw new Error('Ha ocurrido un error al eliminar al usuario.');
    }
}