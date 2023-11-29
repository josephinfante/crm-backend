export interface IDistrict {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    city_id: string;
    user_id: string | null;
}