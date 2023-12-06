import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { TrackingClassificationAction } from "../../domain/tracking-classification-action/tracking-classification-action";
import { ListCondition, UniqueID } from "../../shared/utils";
import { TrackingClassificationActionModel } from "../../shared/models";
import { TrackingClassificationActionError } from "../../shared/errors";

class TrackingClassificationActionDao {
    async create(access: IAccessPermission, tracking_classification_action: TrackingClassificationAction): Promise<TrackingClassificationAction> {
        try {
            const new_tracking_classification_action = {
                id: UniqueID.generate(),
                name: tracking_classification_action.name,
                code: tracking_classification_action.code,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                tracking_classification_id: tracking_classification_action.tracking_classification_id,
                user_id: access.user_id
            }

            const [_tracking_classification_action, created] = await TrackingClassificationActionModel.findOrCreate({
                    where: {
                        [Op.or] : [
                            { name: new_tracking_classification_action.name },
                            { code: new_tracking_classification_action.code }
                        ]
                    },
                    defaults: new_tracking_classification_action
                })
                .then(tracking_classification_action => tracking_classification_action)
                .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al tratar de crear la acción de clasificación de seguimiento.")});

            if (!created) throw new TrackingClassificationActionError("Ya existe una acción de clasificación de seguimiento con el mismo nombre o código.");

            return new_tracking_classification_action;
        } catch (error) {
            if (error instanceof Error && error.message) throw new TrackingClassificationActionError(error.message);
            else throw new Error('Ha ocurrido un error al crear la acción de clasificación de seguimiento.');
        }
    }
    async update(access: IAccessPermission, id: string, tracking_classification_action: TrackingClassificationAction): Promise<TrackingClassificationAction> {
        try {
            const tracking_classification_action_exists = access.super_admin === true ?
                await TrackingClassificationActionModel.findOne({ where: { id } })
                    .then(tracking_classification_action => tracking_classification_action)
                    .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al revisar la acción de clasificación de seguimiento.")}) :
                await TrackingClassificationActionModel.findOne({ where: { id, user_id: access.user_id } })
                    .then(tracking_classification_action => tracking_classification_action)
                    .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al revisar la acción de clasificación de seguimiento.")});

            if (!tracking_classification_action_exists) throw new TrackingClassificationActionError("No existe una acción de clasificación de seguimiento con el mismo identificador.");

            const tracking_classification_action_coincidence = (tracking_classification_action.name !== tracking_classification_action_exists.dataValues.name || tracking_classification_action.code !== tracking_classification_action_exists.dataValues.code) ? await TrackingClassificationActionModel.findAll({
                    where: [
                        { 
                            [Op.or]: [
                                { name: tracking_classification_action.name }, 
                                { code: tracking_classification_action.code },
                            ],
                        },
                        { id: { [Op.ne]: id } },
                    ]
                })
                .then(tracking_classification_actions => tracking_classification_actions)
                .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al tratar de actualizar la acción de clasificación de seguimiento.")}) : [];

            if (tracking_classification_action_coincidence.length > 0) throw new TrackingClassificationActionError("Ya existe una acción de clasificación de seguimiento con el mismo nombre o código.");

            tracking_classification_action_exists.set({
                name: tracking_classification_action.name ?? tracking_classification_action_exists.dataValues.name,
                code: tracking_classification_action.code ?? tracking_classification_action_exists.dataValues.code,
                hidden: tracking_classification_action.hidden ?? tracking_classification_action_exists.dataValues.hidden,
                updatedAt: Date.now(),
            })

            const updated = await tracking_classification_action_exists.save()
                .then(tracking_classification_action => tracking_classification_action)
                .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al tratar de actualizar la acción de clasificación de seguimiento.")});

            return updated.dataValues;
        } catch (error) {
            if (error instanceof Error && error.message) throw new TrackingClassificationActionError(error.message);
            else throw new Error('Ha ocurrido un error al actualizar la acción de clasificación de seguimiento.');
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const tracking_classification_action_exists = access.super_admin === true ?
                await TrackingClassificationActionModel.findOne({ where: { id } })
                    .then(tracking_classification_action => tracking_classification_action)
                    .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al revisar la acción de clasificación de seguimiento.")}) :
                await TrackingClassificationActionModel.findOne({ where: { id, user_id: access.user_id } })
                    .then(tracking_classification_action => tracking_classification_action)
                    .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al revisar la acción de clasificación de seguimiento.")});

            if (!tracking_classification_action_exists) throw new TrackingClassificationActionError("No existe una acción de clasificación de seguimiento con el mismo identificador.");

            tracking_classification_action_exists.set({
                deleted: true,
                updatedAt: Date.now(),
            });

            await tracking_classification_action_exists.save().catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al tratar de eliminar la acción de clasificación de seguimiento.")});
        } catch (error) {
            if (error instanceof Error && error.message) throw new TrackingClassificationActionError(error.message);
            else throw new Error('Ha ocurrido un error al eliminar la acción de clasificación de seguimiento.');
        }
    }
    async findByTrackingClassificationId(access: IAccessPermission, page: number, tracking_classification_id: string): Promise<{ tracking_classification_actions: [], total_tracking_classification_action: number, total_pages: number, current_page: number}> {
        try {
            const { count, rows} = access.super_admin === true ?
                await TrackingClassificationActionModel.findAndCountAll({ 
                        where: { tracking_classification_id },
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(tracking_classification_actions => tracking_classification_actions)
                    .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al revisar la acción de clasificación de seguimiento.")}) :
                await TrackingClassificationActionModel.findAndCountAll({ 
                        where: [
                            { user_id: access.user_id },
                            { tracking_classification_id },
                            ListCondition(access), //excludes hidden and deleted if it doesn't have permission
                        ],
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(tracking_classification_actions => tracking_classification_actions)
                    .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al revisar la acción de clasificación de seguimiento.")});

            const tracking_classifications_actions = rows.map(tracking_classification_action => tracking_classification_action.dataValues);

            return { tracking_classification_actions: tracking_classifications_actions as [], total_tracking_classification_action: count, total_pages: Math.ceil(count / 100), current_page: page };
        } catch (error) {
            if (error instanceof Error && error.message) throw new TrackingClassificationActionError(error.message);
            else throw new Error('Ha ocurrido un error al obtener las acciones de clasificación de seguimiento.');
        }
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ tracking_classification_actions: [], total_tracking_classification_action: number, total_pages: number, current_page: number}> {
        try {
            const { count, rows} = access.super_admin === true ?
                await TrackingClassificationActionModel.findAndCountAll({ 
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(tracking_classification_actions => tracking_classification_actions)
                    .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al revisar la acción de clasificación de seguimiento.")}) :
                await TrackingClassificationActionModel.findAndCountAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access), //excludes hidden and deleted if it doesn't have permission
                        ],
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(tracking_classification_actions => tracking_classification_actions)
                    .catch((_error) => {throw new TrackingClassificationActionError("Ha ocurrido un error al revisar la acción de clasificación de seguimiento.")});

            const tracking_classifications_actions = rows.map(tracking_classification_action => tracking_classification_action.dataValues);

            return { tracking_classification_actions: tracking_classifications_actions as [], total_tracking_classification_action: count, total_pages: Math.ceil(count / 100), current_page: page };
        } catch (error) {
            if (error instanceof Error && error.message) throw new TrackingClassificationActionError(error.message);
            else throw new Error('Ha ocurrido un error al obtener las acciones de clasificación de seguimiento.');
        }
    }
}
const trackingClassificationActionDao = new TrackingClassificationActionDao();
export default trackingClassificationActionDao;