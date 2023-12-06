import { ITrackingClassification } from "./tracking-classification.types";

export class TrackingClassification {
    id: string;
    name: string;
    code: string;
    business_unit_id: string;
    sale_phase_id: string;
    hidden: boolean;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
    user_id: string | null;
    constructor(tracking_classification: ITrackingClassification) {
        this.id = tracking_classification.id;
        this.name = tracking_classification.name;
        this.code = tracking_classification.code;
        this.business_unit_id = tracking_classification.business_unit_id;
        this.sale_phase_id = tracking_classification.sale_phase_id;
        this.hidden = tracking_classification.hidden;
        this.deleted = tracking_classification.deleted;
        this.createdAt = tracking_classification.createdAt;
        this.updatedAt = tracking_classification.updatedAt;
        this.user_id = tracking_classification.user_id;
    }
}