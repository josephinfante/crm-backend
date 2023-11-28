import { IAccessPermission } from "../../../domain/auth/access.type";
import { College } from "../../../domain/college/college";
import { CollegeRepository } from "../../../domain/college/college.repository";
import { ICollegeResponse } from "../../../interfaces/presenters/college.presenter";

export class CollegeCrudUseCase {
    constructor(private readonly collegeRepository: CollegeRepository) {}
    async create(access: IAccessPermission, college: College): Promise<ICollegeResponse> {
        return await this.collegeRepository.create(access, college);
    }
    async update(access: IAccessPermission, id: string , college: College): Promise<ICollegeResponse> {
        return await this.collegeRepository.update(access, id, college);
    }
    async delete(access: IAccessPermission, id: string): Promise<string> {
        return await this.collegeRepository.delete(access, id);
    }
    async findAll(access: IAccessPermission, college?: string): Promise<ICollegeResponse[]> {
        return await this.collegeRepository.findAll(access, college);
    }
}