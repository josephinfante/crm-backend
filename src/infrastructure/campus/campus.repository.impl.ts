import { IAccessPermission } from "../../domain/auth/access.type";
import { Campus } from "../../domain/campus/campus";
import { CampusRepository } from "../../domain/campus/campus.repository";
import { ICampusResponse } from "../../interfaces/presenters/campus.presenter";
import campusDao from "./campus.dao";

export class CampusRepositoryImpl implements CampusRepository {
    create(access: IAccessPermission, campus: Campus): Promise<ICampusResponse> {
        return campusDao.create(access, campus);
    }
    update(access: IAccessPermission, id: string, campus: Campus): Promise<ICampusResponse> {
        return campusDao.update(access, id, campus);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return campusDao.delete(access, id);
    }
    findByBusinessUnitId(access: IAccessPermission, business_unit_id: string): Promise<ICampusResponse[]> {
        return campusDao.findByBusinessUnitId(access, business_unit_id);
    }
}