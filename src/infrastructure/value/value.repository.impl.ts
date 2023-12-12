import { IAccessPermission } from "../../domain/auth/access.type";
import { Value } from "../../domain/value/value";
import { ValueRepository } from "../../domain/value/value.repository";
import { IValueResponse } from "../../interfaces/presenters/value.presenter";
import valueDao from "./value.dao";

export class ValueRepositoryImpl implements ValueRepository {
    create(access: IAccessPermission, value: Value): Promise<IValueResponse> {
        return valueDao.create(access, value);
    }
    update(access: IAccessPermission, id: string, value: Value): Promise<IValueResponse> {
        return valueDao.update(access, id, value);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return valueDao.delete(access, id);
    }
    findById(access: IAccessPermission, id: string): Promise<IValueResponse> {
        return valueDao.findById(access, id);
    }
    findAll(access: IAccessPermission, hidden?: boolean): Promise<IValueResponse[]> {
        return valueDao.findAll(access, hidden);
    }
}