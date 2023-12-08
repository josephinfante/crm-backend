import { IAccessPermission } from "../../../domain/auth/access.type";
import { Event } from "../../../domain/event/event";
import { EventRepository } from "../../../domain/event/event.repository";
import { IEventResponse } from "../../../interfaces/presenters/event.presenter";

export class EventCrudUseCase {
    constructor(private readonly eventRepository: EventRepository) {}
    async create(access: IAccessPermission, event: Event): Promise<IEventResponse> {
        return await this.eventRepository.create(access, event);
    }
    async update(access: IAccessPermission, id: string, event: Event): Promise<IEventResponse> {
        return await this.eventRepository.update(access, id, event);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.eventRepository.delete(access, id);
    }
    async findById(access: IAccessPermission, id: string): Promise<IEventResponse> {
        return await this.eventRepository.findById(access, id);
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ events: {}[], total_events: number, total_pages: number, current_page: number}> {
        return await this.eventRepository.findAll(access, page);
    }
}