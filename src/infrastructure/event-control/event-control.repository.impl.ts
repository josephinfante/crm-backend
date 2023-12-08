import { IAccessPermission } from "../../domain/auth/access.type";
import { EventControl } from "../../domain/event-control/event-control";
import { EventControlRepository } from "../../domain/event-control/event-control.repository";
import { IEventControlResponse } from "../../interfaces/presenters/event-control.presenter";
import eventControlDao from "./event-control.dao";

export class EventControlRepositoryImpl implements EventControlRepository {
    create(access: IAccessPermission, event_control: EventControl): Promise<IEventControlResponse> {
        return eventControlDao.create(access, event_control);
    }
    update(access: IAccessPermission, id: string, event_control: EventControl): Promise<IEventControlResponse> {
        return eventControlDao.update(access, id, event_control);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return eventControlDao.delete(access, id);
    }
    findById(access: IAccessPermission, id: string): Promise<IEventControlResponse> {
        return eventControlDao.findById(access, id);
    }
    findAll(access: IAccessPermission, page: number): Promise<{ event_controls: {}[], total_event_control: number, total_pages: number, current_page: number}> {
        return eventControlDao.findAll(access, page);
    }
}