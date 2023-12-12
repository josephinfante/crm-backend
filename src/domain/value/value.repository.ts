import { IValueResponse } from "../../interfaces/presenters/value.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Value } from "./value";

export interface ValueRepository {
    create(access: IAccessPermission, value: Value): Promise<IValueResponse>;
    update(access: IAccessPermission, id: string, value: Value): Promise<IValueResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findById(access: IAccessPermission, id: string): Promise<IValueResponse>;
    findAll(access: IAccessPermission, hidden?: boolean): Promise<IValueResponse[]>;
}