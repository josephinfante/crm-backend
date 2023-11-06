import { JWT_SECRET } from "../../../../globals";
import { PageError, RoleError, UserError } from "../../../shared/errors";
import { Page, Role, User } from "../../../shared/schemas";
import { compare_password } from "../../../shared/utils";
import { SignJWT } from 'jose';

async function loginUser(login: {email: string, password: string}) {
    try {
        const user = await User.findOne({where: {email: login.email}}).catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')}).then(user => user);
        if (!user) throw new UserError(`El usuario con email ${login.email} no se ha encontrado.`);
        const password_match = await compare_password(login.password, user.dataValues.password);
        if (!password_match) throw new UserError(`La contraseña es incorrecta.`);
        const pages = await Page.findAll({where: {role_id: user.dataValues.role_id}}).catch(_error => {throw new PageError('Ha ocurrido un error al revisar las páginas del usuario')}).then(pages => pages);
        const role = await Role.findOne({where: {id: user.dataValues.role_id}}).catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol del usuario')}).then(role => role);
        const secretKey: Uint8Array = new TextEncoder().encode(JWT_SECRET);
        const sign_content = {id: user.dataValues.id, role: role?.dataValues.name}
        const token = await new SignJWT(sign_content)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secretKey)
            .catch(_error => {throw new UserError('Ha ocurrido un error al firmar el token.')})
            .then(token => token);
        return ({
            id: user.dataValues.id,
            first_name: user.dataValues.first_name,
            last_name: user.dataValues.last_name,
            email: user.dataValues.email,
            document_number: user.dataValues.document_number,
            document_type: user.dataValues.document_type,
            phone_number: user.dataValues.phone_number,
            token: token,
            pages: pages.map(page => page.dataValues.name),
            createdAt: user.dataValues.createdAt,
            updatedAt: user.dataValues.updatedAt,
        });
    } catch (error) {
        if (error instanceof Error && error.message) throw new UserError(error.message);
        else throw new Error('Ha ocurrido un error al loguearse.');
    }
}

export default loginUser;