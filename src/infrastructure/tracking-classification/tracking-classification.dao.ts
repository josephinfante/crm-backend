import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { TrackingClassification } from "../../domain/tracking-clasification/tracking-classification";
import { TrackingClassificationModel } from "../../shared/models";
import { ListCondition, UniqueID } from "../../shared/utils";
import { TrackingClassificationError } from "../../shared/errors";

class TrackingClassificationDao {
    async create(access: IAccessPermission, tracking_classification: TrackingClassification): Promise<TrackingClassification> {
        try {
            const new_tracking_classification = {
                id: UniqueID.generate(),
                name: tracking_classification.name,
                code: tracking_classification.code,
                sale_phase_id: tracking_classification.sale_phase_id,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                business_unit_id: tracking_classification.business_unit_id,
                user_id: access.user_id
            }

            const [_tracking_classification, created] = await TrackingClassificationModel.findOrCreate({
                    where: {
                        [Op.or] : [
                            { name: new_tracking_classification.name },
                            { code: new_tracking_classification.code }
                        ]
                    },
                    defaults: new_tracking_classification
                })
                .then(tracking_classification => tracking_classification)
                .catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al tratar de crear la clasificación de seguimiento.")});

            if(!created) throw new TrackingClassificationError("Ya existe una clasificación de seguimiento con el mismo nombre o código");

            return new_tracking_classification;
        } catch (error) {
            if (error instanceof Error && error.message) throw new TrackingClassificationError(error.message);
            else throw new Error('Ha ocurrido un error al crear la clasificación de seguimiento.');
        }
    }
    async update(access: IAccessPermission, id: string, tracking_classification: TrackingClassification): Promise<TrackingClassification> {
        try {
            const tracking_classification_exists = access.super_admin === true ?
                await TrackingClassificationModel.findOne({ where: { id } })
                    .then(tracking_classification => tracking_classification)
                    .catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al revisar la clasificación de seguimiento.")}) :
                await TrackingClassificationModel.findOne({ where: { id, user_id: access.user_id } })
                    .then(tracking_classification => tracking_classification)
                    .catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al revisar la clasificación de seguimiento.")});

            if(!tracking_classification_exists) throw new TrackingClassificationError("No existe una clasificación de seguimiento con el id proporcionado.");

            const tracking_classification_coincidence = (tracking_classification.name !== tracking_classification_exists.dataValues.name || tracking_classification.code !== tracking_classification_exists.dataValues.code || tracking_classification.sale_phase_id !== tracking_classification_exists.dataValues.sale_phase_id) ? 
                await TrackingClassificationModel.findAll({ 
                        where: [
                            { 
                                [Op.or]: [
                                    { name: tracking_classification.name }, 
                                    { code: tracking_classification.code },
                                ],
                            },
                            { id: { [Op.ne]: id } },
                       ]
                    })
                    .then(tracking_classifications => tracking_classifications)
                    .catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al revisar la clasificación de seguimiento.")}) : [];

            if(tracking_classification_coincidence.length > 0) throw new TrackingClassificationError("Ya existe una clasificación de seguimiento con el mismo nombre o código.");

            tracking_classification_exists.set({
                name: tracking_classification.name ?? tracking_classification_exists.dataValues.name,
                code: tracking_classification.code ?? tracking_classification_exists.dataValues.code,
                sale_phase_id: tracking_classification.sale_phase_id ?? tracking_classification_exists.dataValues.sale_phase_id,
                hidden: tracking_classification.hidden ?? tracking_classification_exists.dataValues.hidden,
                updatedAt: Date.now()
            });

            const updated = await tracking_classification_exists.save()
                .then(tracking_classification => tracking_classification)
                .catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al tratar de actualizar la clasificación de seguimiento.")});

            return updated.dataValues;
        } catch (error) {
            if (error instanceof Error && error.message) throw new TrackingClassificationError(error.message);
            else throw new Error('Ha ocurrido un error al actualizar la clasificación de seguimiento.');
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const tracking_classification_exists = access.super_admin === true ?
                await TrackingClassificationModel.findOne({ where: { id } })
                    .then(tracking_classification => tracking_classification)
                    .catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al revisar la clasificación de seguimiento.")}) :
                await TrackingClassificationModel.findOne({ where: { id, user_id: access.user_id } })
                    .then(tracking_classification => tracking_classification)
                    .catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al revisar la clasificación de seguimiento.")});

            if(!tracking_classification_exists) throw new TrackingClassificationError("No existe una clasificación de seguimiento con el id proporcionado.");

            tracking_classification_exists.set({
                deleted: true,
                updatedAt: Date.now()
            })

            await tracking_classification_exists.save().catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al tratar de eliminar la clasificación de seguimiento.")});
        } catch (error) {
            if (error instanceof Error && error.message) throw new TrackingClassificationError(error.message);
            else throw new Error('Ha ocurrido un error al eliminar la clasificación de seguimiento.');
        }
    }
    async findAll(access: IAccessPermission, page: number): Promise<{ tracking_classifications: [], total_tracking_classification: number, total_pages: number, current_page: number}> {
        try {
            const { count, rows} = access.super_admin === true ?
                await TrackingClassificationModel.findAndCountAll({ 
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(tracking_classifications => tracking_classifications)
                    .catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al revisar las clasificaciones de seguimiento.")}) :
                await TrackingClassificationModel.findAndCountAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access), //excludes hidden and deleted if it doesn't have permission
                        ],
                        limit: 100,
                        offset: (page - 1) * 100,
                    })
                    .then(tracking_classifications => tracking_classifications)
                    .catch((_error) => {throw new TrackingClassificationError("Ha ocurrido un error al revisar las clasificaciones de seguimiento.")});

            const tracking_classifications = rows.map(tracking_classification => tracking_classification.dataValues);

            return { tracking_classifications: tracking_classifications as [], total_tracking_classification: count, total_pages: Math.ceil(count / 100), current_page: page };
        } catch (error) {
            if (error instanceof Error && error.message) throw new TrackingClassificationError(error.message);
            else throw new Error('Ha ocurrido un error al buscar las clasificaciones de seguimiento.');
        }
    }
}
const trackingClassificationDao = new TrackingClassificationDao();
export default trackingClassificationDao;