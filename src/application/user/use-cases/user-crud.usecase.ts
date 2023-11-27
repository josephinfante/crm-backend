import { IAccessPermission } from "../../../domain/auth/access.type";
import { ILogin } from "../../../domain/auth/login.type";
import { User } from "../../../domain/user/user";
import { UserRepository } from "../../../domain/user/user.repository";
import { IUserResponse } from "../../../interfaces/presenters/user.presenter";

export class UserCrudUseCase {
    constructor(private readonly userRespository: UserRepository) {}
    async create(access: IAccessPermission, user: User): Promise<IUserResponse> {
        return await this.userRespository.create(access, user);
    }
    async update(access: IAccessPermission, id: string, user: User): Promise<IUserResponse> {
        return await this.userRespository.update(access, id, user);
    }
    async delete(access: IAccessPermission, id: string): Promise<void> {
        return await this.userRespository.delete(access, id);
    }
    async findById(access: IAccessPermission, id: string): Promise<IUserResponse> {
        return await this.userRespository.findById(access, id);
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ users: [], total_users: number, total_pages: number, current_page: number}> {
        return await this.userRespository.findAll(access, page);
    }
    async login(email: string, password: string): Promise<ILogin> {
        return await this.userRespository.login(email, password);
    }
}