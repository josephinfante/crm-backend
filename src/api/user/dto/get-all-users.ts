import { UserError } from "../../../shared/errors";
import { Role, User } from "../../../shared/schemas";

export async function GetAllUsers (page: number) {
    try {
        const { count, rows} = await User.findAndCountAll({
            attributes: {exclude: ['password']},
            include: [{ model: Role, attributes: ['name'] }],
            limit: 100,
            offset: (page - 1) * 100,
        }).catch(_error => {throw new UserError('Ha ocurrido un error al tratar de obtener los usuarios.')}).then(users => users);
        const reshapedUsers = rows.map((user: any) => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            document_type: user.document_type,
            document_number: user.document_number,
            phone_number: user.phone_number,
            role: user.role.name,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
        }));
        return { users: reshapedUsers, total_users: count, total_pages: Math.ceil(count / 100), current_page: page };
    } catch (error) {
        if (error instanceof Error && error.message) throw new UserError(error.message);
        else throw new Error('Ha ocurrido un error al obtener los usuarios.');
    }
}