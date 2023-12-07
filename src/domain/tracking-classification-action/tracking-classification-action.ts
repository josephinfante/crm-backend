import { ITrackingClassificationAction } from "./tracking-classification-action.type";

export class TrackingClassificationAction {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    tracking_classification_id: string;
    user_id: string | null;
    constructor(tracking_classification_action: ITrackingClassificationAction) {
        this.id = tracking_classification_action.id;
        this.name = tracking_classification_action.name;
        this.code = tracking_classification_action.code;
        this.hidden = tracking_classification_action.hidden;
        this.deleted = tracking_classification_action.deleted;
        this.createdAt = tracking_classification_action.createdAt;
        this.updatedAt = tracking_classification_action.updatedAt;
        this.tracking_classification_id = tracking_classification_action.tracking_classification_id;
        this.user_id = tracking_classification_action.user_id;
    }
}