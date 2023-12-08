import { IEventControlResponse } from "../../interfaces/presenters/event-control.presenter";
import { IAccessPermission } from "../auth/access.type";
import { EventControl } from "./event-control";

export interface EventControlRepository {
    create(access: IAccessPermission, event_control: EventControl): Promise<IEventControlResponse>;
    update(access: IAccessPermission, id: string, event_control: EventControl): Promise<IEventControlResponse>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findById(access: IAccessPermission, id: string): Promise<IEventControlResponse>;
    findAll(access: IAccessPermission, page: number): Promise<{ event_controls: {}[], total_event_control: number, total_pages: number, current_page: number}>;
}