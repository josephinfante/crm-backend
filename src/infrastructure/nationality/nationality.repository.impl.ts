import { IAccessPermission } from "../../domain/auth/access.type";
import { Nationality } from "../../domain/nationality/nationality";
import { NationalityRepository } from "../../domain/nationality/nationality.repository";
import { INationalityResponse } from "../../interfaces/presenters/nationality.presenter";
import nationalityDao from "./nationality.dao";

export class NationalityRepositoryImpl implements NationalityRepository {
    create(access: IAccessPermission, nationality: Nationality): Promise<INationalityResponse> {
        return nationalityDao.create(access, nationality);
    }
    update(access: IAccessPermission, id: string, nationality: Nationality): Promise<INationalityResponse> {
        return nationalityDao.update(access, id, nationality);
    }
    delete(access: IAccessPermission, id: string): Promise<string> {
        return nationalityDao.delete(access, id);
    }
    findAll(access: IAccessPermission, nationality?: string | undefined): Promise<INationalityResponse[]> {
        return nationalityDao.findAll(access, nationality)
    }
}