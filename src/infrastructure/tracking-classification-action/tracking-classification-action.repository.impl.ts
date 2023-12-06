import { IAccessPermission } from "../../domain/auth/access.type";
import { TrackingClassificationAction } from "../../domain/tracking-classification-action/tracking-classification-action";
import { TrackingClassificationActionRepository } from "../../domain/tracking-classification-action/tracking-classification-action.repository";
import trackingClassificationActionDao from "./tracking-classification-action.dao";

export class TrackingClassificationActionRepositoryImpl implements TrackingClassificationActionRepository {
    create(access: IAccessPermission, tracking_classification_action: TrackingClassificationAction): Promise<TrackingClassificationAction> {
        return trackingClassificationActionDao.create(access, tracking_classification_action);
    }
    update(access: IAccessPermission, id: string, tracking_classification_action: TrackingClassificationAction): Promise<TrackingClassificationAction> {
        return trackingClassificationActionDao.update(access, id, tracking_classification_action);
    }
    delete(access: IAccessPermission, id: string): Promise<string | void> {
        return trackingClassificationActionDao.delete(access, id);
    }
    findByTrackingClassificationId(access: IAccessPermission, page: number, tracking_classification_id: string): Promise<{ tracking_classification_actions: []; total_tracking_classification_action: number; total_pages: number; current_page: number; }> {
        return trackingClassificationActionDao.findByTrackingClassificationId(access, page, tracking_classification_id);
    }
    findAll(access: IAccessPermission, page: number): Promise<{ tracking_classification_actions: []; total_tracking_classification_action: number; total_pages: number; current_page: number; }> {
        return trackingClassificationActionDao.findAll(access, page);
    }
}