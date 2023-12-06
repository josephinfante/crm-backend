import { IAccessPermission } from "../auth/access.type";
import { TrackingClassification } from "./tracking-classification";

export interface TrackingClassificationRepository {
    create(access: IAccessPermission, tracking_classification: TrackingClassification): Promise<TrackingClassification>;
    update(access: IAccessPermission, id: string, tracking_classification: TrackingClassification): Promise<TrackingClassification>;
    delete(access: IAccessPermission, id: string): Promise<string | void>;
    findAll(access: IAccessPermission, page: number): Promise<{ tracking_classifications: [], total_tracking_classification: number, total_pages: number, current_page: number}>;
}