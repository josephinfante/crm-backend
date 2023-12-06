import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { User } from "../../domain/user/user";
import { RoleError, UserError } from "../../shared/errors";
import { RoleModel, UserModel } from "../../shared/models";
import { ListCondition, UniqueID, compare_password, encrypt_password } from "../../shared/utils";
import { ILogin } from "../../domain/auth/login.type";
import { JWT_SECRET } from "../../../globals";
import { SignJWT } from "jose";
import { IUserResponse, UserPresenter } from "../../interfaces/presenters/user.presenter";
import { IRole } from "../../domain/role/role.type";
import { GetPermissionsByRoleId } from "../permission/permission.dao";
import { FindAllPagesWithRoleId } from "../menu/menu.dao";

class UserDao {
    async create(access: IAccessPermission, user: User): Promise<IUserResponse> {
        try {
            let role: IRole;
            role = access.super_admin === true ? 
                await RoleModel.findOne({where: {id: user.role_id}})
                .then(role => role?.dataValues)
                .catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}) :
                await RoleModel.findOne({where: {id: user.role_id, user_id: access.user_id}})
                .then(role => role?.dataValues)
                .catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')});

            if (!role && user.role_id) throw new RoleError('El rol proporcionado no existe.');

            const encrypted_password = await encrypt_password(user.password);

            const new_user = {
                id: UniqueID.generate(),
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: encrypted_password,
                document_type: user.document_type,
                document_number: user.document_number,
                phone_number: user.phone_number,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                role_id: role.id ?? null,
                user_id: access.user_id ?? null,
            }
            const [_user, created] = await UserModel.findOrCreate({
                    where: {
                        email: user.email,
                    },
                    defaults: new_user,
                })
                .catch(_error => {console.log(_error);throw new UserError('Ha ocurrido un error al tratar de crear al usuario.')});

            if (!created) throw new UserError('El correo proporcionado ya esta en uso.');
            
            return UserPresenter(new_user, role);
        }catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new Error('Ha ocurrido un error al crear al usuario.');
        }
    }
    async update(access: IAccessPermission, id: string, user: User): Promise<IUserResponse> {
        try {
            const user_exist = access.super_admin === true ? 
                await UserModel.findOne({
                    where: {id: id},
                    include: [{ model: RoleModel, attributes: ['id', 'name'] }],
                    attributes: {exclude: ['password']}
                })
                .then(user => user)
                .catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')}) :
                await UserModel.findOne({
                    where: {id: id, user_id: access.user_id},
                    include: [{ model: RoleModel, attributes: ['id', 'name'] }],
                    attributes: {exclude: ['password']}
                })
                .then(user => user)
                .catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')});

            if (!user_exist) throw new UserError('El usuario proporcionado no existe.');

            if (user.role_id && (user.role_id !== user_exist.dataValues.role_id)) {
                const role = access.super_admin === true ? 
                    await RoleModel.findOne({where: {id: user.role_id}})
                    .then(role => role)
                    .catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')}) :
                    await RoleModel.findOne({where: {id: user.role_id, user_id: access.user_id}})
                    .then(role => role)
                    .catch(_error => {throw new RoleError('Ha ocurrido un error al revisar el rol.')});
                if (!role) throw new RoleError(`El rol con ID ${user.role_id} no existe.`);
            }

            user_exist.set({
                first_name: user.first_name ?? user_exist.dataValues.first_name,
                last_name: user.last_name ?? user_exist.dataValues.last_name,
                document_type: user.document_type ?? user_exist.dataValues.document_type,
                document_number: user.document_number ?? user_exist.dataValues.document_number,
                phone_number: user.phone_number ?? user_exist.dataValues.phone_number,
                hidden: user.hidden ?? user_exist.dataValues.hidden,                                                   
                updatedAt: Date.now(),
                role_id: user.role_id ?? user_exist.dataValues.role_id,
            });

            const updated = await user_exist.save()
                .then(user => user)
                .catch(_error => {throw new UserError('Ha ocurrido un error al tratar de actualizar al usuario.')});

            if (!updated) throw new UserError('El usuario proporcionado no existe.');
        
            return UserPresenter(updated.dataValues, updated.dataValues.role.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new Error('Ha ocurrido un error al actualizar al usuario.');
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<void> {
        try {
            const user_exist = access.super_admin === true ? 
                await UserModel.findOne({where: {id: id}})
                .then(user => user)
                .catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')}) :
                await UserModel.findOne({where: {id: id, user_id: access.user_id}})
                .then(user => user)
                .catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')});
            if (!user_exist) throw new UserError('El usuario proporcionado no existe.');

            user_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            })
            user_exist.save().catch(_error => {throw new UserError('Ha ocurrido un error al tratar de eliminar al usuario.')});
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new Error('Ha ocurrido un error al eliminar al usuario.');
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IUserResponse> {
        try {
            const user = access.super_admin === true ?
                await UserModel.findOne({
                    where: {id: id}, 
                    include: [{ model: RoleModel, attributes: ['id', 'name'] }],
                    attributes: {exclude: ['password']}
                })
                .then(user => user)
                .catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')}) :
                await UserModel.findOne({
                    where: [
                        { id: id },
                        { user_id: access.user_id },
                        { hidden: { [Op.ne]: true } },
                        { deleted: { [Op.ne]: true } }
                    ], 
                    include: [{ model: RoleModel, attributes: ['id', 'name'] }],
                    attributes: {exclude: ['password']}
                })
                .then(user => user)
                .catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')});

            if (!user) throw new UserError(`El usuario con ID ${id} no existe.`);

            return UserPresenter(user.dataValues, user.dataValues.role);
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new Error('Ha ocurrido un error al obtener al usuario.');
        }
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ users: [], total_users: number, total_pages: number, current_page: number}> {
        try {
            const { count, rows} = access.super_admin === true ?
                await UserModel.findAndCountAll({
                    attributes: {exclude: ['password']},
                    include: [{ model: RoleModel, attributes: ['id', 'name'] }],
                    where: {
                        [Op.or]: [
                            { super_admin: { [Op.is]: null } }, //excludes super_admin
                        ],
                    },
                    limit: 100,
                    offset: (page - 1) * 100,
                })
                .then(users => users)
                .catch(_error => {throw new UserError('Ha ocurrido un error al tratar de obtener los usuarios.')}) :
                await UserModel.findAndCountAll({
                    where: [
                        { user_id: access.user_id },
                        ListCondition(access), //excludes hidden and deleted if it doesn't have permission
                        {
                            [Op.or]: [
                                { super_admin: { [Op.is]: null } }, //excludes super_admin
                            ],
                        }
                    ],
                    attributes: {exclude: ['password']},
                    include: [{ model: RoleModel, attributes: ['id', 'name'] }],
                    limit: 100,
                    offset: (page - 1) * 100,
                })
                .then(users => users)
                .catch(_error => {throw new UserError('Ha ocurrido un error al tratar de obtener los usuarios.')});
            const users = rows.map((user: any) => UserPresenter(user.dataValues, user.role.dataValues, access));
            return { users: users as [], total_users: count, total_pages: Math.ceil(count / 100), current_page: page };
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new Error('Ha ocurrido un error al obtener los usuarios.');
        }
    }
    async login(email: string, password: string): Promise<ILogin> {
        try {
            const user = await UserModel.findOne({
                    where: { email: email },
                    include: [{ model: RoleModel, attributes: ['id', 'name'] }]
                })
                .then(user => user)
                .catch(_error => {throw new UserError('Ha ocurrido un error al revisar al usuario.')});
            if (!user) throw new UserError(`El usuario con email ${email} no se ha encontrado.`);
            const password_match = await compare_password(password, user.dataValues.password);

            if (!password_match) throw new UserError('La contraseña es incorrecta.');

            const permissions = await GetPermissionsByRoleId(user.dataValues.role_id);
            const pages = await FindAllPagesWithRoleId(user.dataValues.role_id);

            const roleName = user.dataValues.role?.name;
            const secretKey: Uint8Array = new TextEncoder().encode(JWT_SECRET);
            const signContent = { id: user.dataValues.id, role: roleName ?? '' };

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
                pages: pages.map(page => {
                    return {
                        id: page.id,
                        name: page.name,
                        external_url: page.external_url,
                    };
                }),
                permissions: permissions.map(permission => {
                    return {
                        component: {
                            id: permission.id,
                            name: permission.name,
                        },
                        permissions: {
                            create: permission.permissions.create,
                            read: permission.permissions.read,
                            update: permission.permissions.update,
                            delete: permission.permissions.delete,
                            read_all: permission.permissions.read_all,
                            read_deleted: permission.permissions.read_deleted,
                        },
                    };
                }),
                createdAt: user.dataValues.createdAt,
                updatedAt: user.dataValues.updatedAt,
            };
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new Error('Ha ocurrido un error al iniciar sesión.');
        }
    }
}
const userDao = new UserDao();
export default userDao;