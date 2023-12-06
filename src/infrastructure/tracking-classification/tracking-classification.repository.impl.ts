import { IAccessPermission } from "../../domain/auth/access.type";
import { TrackingClassification } from "../../domain/tracking-clasification/tracking-classification";
import { TrackingClassificationRepository } from "../../domain/tracking-clasification/tracking-classification.repository";
import trackingClassificationDao from "./tracking-classification.dao";

export class TrackingClassificationRepositoryImpl implements TrackingClassificationRepository {
    create(access: IAccessPermission, tracking_clasification: TrackingClassification): Promise<TrackingClassification> {
        return trackingClassificationDao.create(access, tracking_clasification);
    }
    update(access: IAccessPermission, id: string, tracking_clasification: TrackingClassification): Promise<TrackingClassification> {
        return trackingClassificationDao.update(access, id, tracking_clasification);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return trackingClassificationDao.delete(access, id);
    }
    findAll(access: IAccessPermission, page: number): Promise<{ tracking_classifications: []; total_tracking_classification: number; total_pages: number; current_page: number; }> {
        return trackingClassificationDao.findAll(access, page);
    }
}