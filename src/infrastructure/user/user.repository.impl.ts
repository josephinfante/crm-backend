import { IAccessPermission } from "../../domain/auth/access.type";
import { ILogin } from "../../domain/auth/login.type";
import { User } from "../../domain/user/user";
import { UserRepository } from "../../domain/user/user.repository";
import { IUserResponse } from "../../interfaces/presenters/user.presenter";
import userDao from "./user.dao";

export class UserRepositoryImpl implements UserRepository {
    create(access: IAccessPermission, user: User): Promise<IUserResponse> {
        return userDao.create(access, user);
    }
    update(access: IAccessPermission, id: string, user: User): Promise<IUserResponse> {
        return userDao.update(access, id, user);
    }
    delete(access: IAccessPermission, id: string): Promise<void> {
        return userDao.delete(access, id);
    }
    findById(access: IAccessPermission, id: string): Promise<IUserResponse> {
        return userDao.findById(access, id);
    }
    findAll(access: IAccessPermission, page: number): Promise<{ users: []; total_users: number; total_pages: number; current_page: number; }> {
        return userDao.findAll(access, page);
    }
    login(email: string, password: string): Promise<ILogin> {
        return userDao.login(email, password);
    }
}