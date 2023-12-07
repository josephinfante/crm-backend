export interface ICreateTrackingClassificationAction {
    name: string;
    code: string;
    tracking_classification_id: string;
}

export interface IUpdateTrackingClassificationAction extends ICreateTrackingClassificationAction {
    hidden: boolean;
}

export interface ITrackingClassificationAction extends ICreateTrackingClassificationAction {
    id: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
}