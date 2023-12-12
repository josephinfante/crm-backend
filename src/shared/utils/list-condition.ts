import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";

export function ListCondition(access: IAccessPermission, hidden?: boolean) {
    const conditions: any[] = [];

    if (access.super_admin !== true) {
        if (hidden === false) {
            conditions.push({ hidden: { [Op.ne]: true } });
            conditions.push({ deleted: { [Op.ne]: true } });
            return { [Op.and]: conditions };
        }
        if (access.permission.read_deleted === false) {
            conditions.push({ deleted: { [Op.ne]: true } });
            return { [Op.and]: conditions };
        }
    }

    return {};
}