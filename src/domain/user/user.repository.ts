import { IUserResponse } from "../../interfaces/presenters/user.presenter";
import { IAccessPermission } from "../auth/access.type";
import { ILogin } from "../auth/login.type";
import { User } from "./user";

export interface UserRepository {
    create(access: IAccessPermission, user: User): Promise<IUserResponse>;
    update(access: IAccessPermission, id: string, user: User): Promise<IUserResponse>;
    delete(access: IAccessPermission, id: string): Promise<void>;
    findById(access: IAccessPermission, id: string): Promise<IUserResponse>;
    findAll(access: IAccessPermission, page: number): Promise<{ users: [], total_users: number, total_pages: number, current_page: number}>;
    login(email: string, password: string): Promise<ILogin>;
}