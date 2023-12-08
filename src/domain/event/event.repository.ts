import { IEventResponse } from "../../interfaces/presenters/event.presenter";
import { IAccessPermission } from "../auth/access.type";
import { Event } from "./event";

export interface EventRepository {
    create(access: IAccessPermission, event: Event): Promise<IEventResponse>;
    update(access: IAccessPermission, id: string, event: Event): Promise<IEventResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findById(access: IAccessPermission, id: string): Promise<IEventResponse>;
    findAll(access: IAccessPermission, page: number): Promise<{ events: {}[], total_events: number, total_pages: number, current_page: number}>;
}