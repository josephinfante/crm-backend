import { IAccessPermission } from "../../domain/auth/access.type";
import { ICollege } from "../../domain/college/college.type";

export interface ICollegeResponse {
    id: string;
    name: string;
    code: string;
    type: string;
    class: string;
    level: string;
    board: string;
    is_competitor: boolean;
    priority: number;
    hidden: boolean;
    deleted?: boolean;
    updatedAt: number;
    createdAt: number;
}

export function CollegePresenter(college: ICollege, access: IAccessPermission): ICollegeResponse {
    return {
        id: college.id,
        name: college.name,
        code: college.code,
        type: college.type,
        class: college.class,
        level: college.level,
        board: college.board,
        is_competitor: college.is_competitor,
        priority: college.priority,
        hidden: college.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: college.deleted }),
        updatedAt: college.updatedAt,
        createdAt: college.createdAt,
    }
}