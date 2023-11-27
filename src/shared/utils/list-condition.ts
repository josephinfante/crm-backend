import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";

export function ListCondition(access: IAccessPermission) {
    const conditions: any[] = [];

    if (access.super_admin !== true) {
        if (access.permission.read && (!access.permission.read_all && !access.permission.read_deleted)) {
            conditions.push({ hidden: { [Op.ne]: true } });
            conditions.push({ deleted: { [Op.ne]: true } });
        }
        if (access.permission.read_all && !access.permission.read_deleted) {
            conditions.push({ deleted: { [Op.ne]: true } });
        }
    }

    const whereClause = conditions.length > 0 ? { [Op.and]: conditions } : {};
    return whereClause;
}