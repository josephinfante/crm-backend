import { IAccessPermission } from "../../../domain/auth/access.type";
import { EventControl } from "../../../domain/event-control/event-control";
import { EventControlRepository } from "../../../domain/event-control/event-control.repository";
import { IEventControlResponse } from "../../../interfaces/presenters/event-control.presenter";

export class EventControlCrudUseCase {
    constructor(private readonly eventControlRepository: EventControlRepository) {}
    async create(access: IAccessPermission, event_control: EventControl): Promise<IEventControlResponse> {
        return await this.eventControlRepository.create(access, event_control)
    }
    async update(access: IAccessPermission, id: string, event_control: EventControl): Promise<IEventControlResponse> {
        return await this.eventControlRepository.update(access, id, event_control)
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.eventControlRepository.delete(access, id)
    }
    async findById(access: IAccessPermission, id: string): Promise<IEventControlResponse> {
        return await this.eventControlRepository.findById(access, id)
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ event_controls: {}[], total_event_control: number, total_pages: number, current_page: number}> {
        return await this.eventControlRepository.findAll(access, page)
    }
}