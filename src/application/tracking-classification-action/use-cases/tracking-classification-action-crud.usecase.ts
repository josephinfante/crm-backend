import { IAccessPermission } from "../../../domain/auth/access.type";
import { TrackingClassificationAction } from "../../../domain/tracking-classification-action/tracking-classification-action";
import { TrackingClassificationActionRepository } from "../../../domain/tracking-classification-action/tracking-classification-action.repository";

export class TrackingClassificationActionCrudUseCase {
    constructor(private readonly trackingClassificationActionRepository: TrackingClassificationActionRepository) {}
    async create(access: IAccessPermission, tracking_classification_action: TrackingClassificationAction): Promise<TrackingClassificationAction> {
        return await this.trackingClassificationActionRepository.create(access, tracking_classification_action);
    }
    async update(access: IAccessPermission, id: string, tracking_classification_action: TrackingClassificationAction): Promise<TrackingClassificationAction> {
        return await this.trackingClassificationActionRepository.update(access, id, tracking_classification_action);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.trackingClassificationActionRepository.delete(access, id);
    }
    async findByTrackingClassificationId(access: IAccessPermission, page: number, tracking_classification_id: string): Promise<{ tracking_classification_actions: [], total_tracking_classification_action: number, total_pages: number, current_page: number}> {
        return await this.trackingClassificationActionRepository.findByTrackingClassificationId(access, page, tracking_classification_id);
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ tracking_classification_actions: [], total_tracking_classification_action: number, total_pages: number, current_page: number}> {
        return await this.trackingClassificationActionRepository.findAll(access, page);
    }
}