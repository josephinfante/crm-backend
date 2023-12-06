import { IAccessPermission } from "../../../domain/auth/access.type";
import { TrackingClassification } from "../../../domain/tracking-clasification/tracking-classification";
import { TrackingClassificationRepository } from "../../../domain/tracking-clasification/tracking-classification.repository";

export class TrackingClassificationCrudUseCase {
    constructor(private readonly trackingClassificationRepository: TrackingClassificationRepository) {}
    async create(access: IAccessPermission, tracking_clasification: TrackingClassification): Promise<TrackingClassification> {
        return await this.trackingClassificationRepository.create(access, tracking_clasification);
    }
    async update(access: IAccessPermission, id: string, tracking_clasification: TrackingClassification): Promise<TrackingClassification> {
        return await this.trackingClassificationRepository.update(access, id, tracking_clasification);
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        return await this.trackingClassificationRepository.delete(access, id);
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ tracking_classifications: [], total_tracking_classification: number, total_pages: number, current_page: number}> {
        return await this.trackingClassificationRepository.findAll(access, page);
    }
}