import { IDegreeSpecification } from "./degree-specification.type";

export class DegreeSpecification {
    id: string;
    name: string;
    code: string;
    hidden: boolean;
    deleted: boolean;
    updatedAt: number;
    createdAt: number;
    degree_id: string;
    user_id: string | null;
    constructor (degree_specification: IDegreeSpecification) {
        this.id = degree_specification.id;
        this.name = degree_specification.name;
        this.code = degree_specification.code;
        this.hidden = degree_specification.hidden;
        this.deleted = degree_specification.deleted;
        this.updatedAt = degree_specification.updatedAt;
        this.createdAt = degree_specification.createdAt;
        this.degree_id = degree_specification.degree_id;
        this.user_id = degree_specification.user_id;
    }
}