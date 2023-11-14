import { Op } from "sequelize";
import { SignJWT } from 'jose';
import { JWT_SECRET } from "../../../../globals";
import { PageError, UserError } from "../../../shared/errors";
import { Page, Role, User } from "../../../shared/schemas";
import { compare_password } from "../../../shared/utils";
import { GetPermissionsByRoleId } from "../../permission/dto/get-permissions-by-role-id";
import { LoginInterface } from "../user.type";

async function loginUser(login: { email: string; password: string }): Promise<LoginInterface> {
    try {
        const user = await User.findOne({
            where: { email: login.email },
            include: [{ model: Role, attributes: ['name'] }]
        }).catch(_error => {
            throw new UserError('Ha ocurrido un error al revisar al usuario.');
        });

        if (!user) throw new UserError(`El usuario con email ${login.email} no se ha encontrado.`);

        const password_match = await compare_password(login.password, user.dataValues.password);

        if (!password_match) throw new UserError(`La contraseña es incorrecta.`);

        const pages = await Page.findAll({
            where: { role_ids: { [Op.like]: [`%${user.dataValues.role_id}%`] } }
        }).catch(_error => {
            throw new PageError('Ha ocurrido un error al revisar las páginas del rol');
        });

        const permissions = await GetPermissionsByRoleId(user.dataValues.role_id);

        const secretKey: Uint8Array = new TextEncoder().encode(JWT_SECRET);
        const signContent = { id: user.dataValues.id, role: user.dataValues.role.name };

        const token = await new SignJWT(signContent)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secretKey)
            .catch(_error => {
                throw new UserError('Ha ocurrido un error al firmar el token.');
            });

        return {
            id: user.dataValues.id,
            first_name: user.dataValues.first_name,
            last_name: user.dataValues.last_name,
            email: user.dataValues.email,
            document_number: user.dataValues.document_number,
            document_type: user.dataValues.document_type,
            phone_number: user.dataValues.phone_number,
            token: token,
            pages: pages.map(page => ({
                name: page.dataValues.name,
                nickname: page.dataValues.nickname,
                internal_url: page.dataValues.internal_url,
                external_url: page.dataValues.external_url,
            })),
            permissions: permissions.map(permission => ({
                component: permission.component.name,
                permissions: {
                    create: permission.create,
                    read: permission.read,
                    update: permission.update,
                    delete: permission.delete,
                }
            })),
            createdAt: user.dataValues.createdAt,
            updatedAt: user.dataValues.updatedAt,
        };
    } catch (error) {
        if (error instanceof Error && error.message) throw new UserError(error.message);
        else throw new Error('Ha ocurrido un error al loguearse.');
    }
}

export default loginUser;
