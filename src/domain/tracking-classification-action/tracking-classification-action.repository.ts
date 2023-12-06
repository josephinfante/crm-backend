import { IAccessPermission } from "../auth/access.type";
import { TrackingClassificationAction } from "./tracking-classification-action";

export interface TrackingClassificationActionRepository {
    create(access: IAccessPermission, tracking_classification_action: TrackingClassificationAction): Promise<TrackingClassificationAction>;
    update(access: IAccessPermission, id: string, tracking_classification_action: TrackingClassificationAction): Promise<TrackingClassificationAction>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findByTrackingClassificationId(access: IAccessPermission, page: number, tracking_classification_id: string): Promise<{ tracking_classification_actions: [], total_tracking_classification_action: number, total_pages: number, current_page: number}>;
    findAll(access: IAccessPermission, page: number): Promise<{ tracking_classification_actions: [], total_tracking_classification_action: number, total_pages: number, current_page: number}>;
}