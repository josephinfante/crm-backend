export interface ICreateTrackingClassification {
    name: string;
    code: string;
    business_unit_id: string;
    sale_phase_id: string;
}

export interface IUpdateTrackingClassification extends ICreateTrackingClassification{
    hidden: boolean;
}

export interface ITrackingClassification extends ICreateTrackingClassification {
    id: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
}