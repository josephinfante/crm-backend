import { IAccessPermission } from "../../domain/auth/access.type";
import { Event } from "../../domain/event/event";
import { EventRepository } from "../../domain/event/event.repository";
import { IEventResponse } from "../../interfaces/presenters/event.presenter";
import eventDao from "./event.dao";

export class EventRepositoryImpl implements EventRepository {
    create(access: IAccessPermission, event: Event): Promise<IEventResponse> {
        return eventDao.create(access, event);
    }
    update(access: IAccessPermission, id: string, event: Event): Promise<IEventResponse> {
        return eventDao.update(access, id, event);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return eventDao.delete(access, id);
    }
    findById(access: IAccessPermission, id: string): Promise<IEventResponse> {
        return eventDao.findById(access, id);
    }
    findAll(access: IAccessPermission, page: number): Promise<{ events: {}[]; total_events: number; total_pages: number; current_page: number; }> {
        return eventDao.findAll(access, page);
    }
}