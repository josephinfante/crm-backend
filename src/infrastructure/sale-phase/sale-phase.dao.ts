import { Op } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { SalePhase } from "../../domain/sale-phase/sale-phase";
import { SalePhaseModel } from "../../shared/models";
import { ListCondition, UniqueID } from "../../shared/utils";
import { SalePhaseError } from "../../shared/errors";
import { ISalePhaseResponse, SalePhasePresenter } from "../../interfaces/presenters/sale-phase.presenter";

class SalePhaseDao {
    async create(access: IAccessPermission, sale_phase: SalePhase): Promise<ISalePhaseResponse> {
        try {
            const new_sale_phase = {
                id: UniqueID.generate(),
                name: sale_phase.name,
                code: sale_phase.code,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                user_id: access.user_id
            }

            const [_sale_phase, created] = await SalePhaseModel.findOrCreate({
                    where: {
                        [Op.or]: [
                            { name: new_sale_phase.name },
                            { code: new_sale_phase.code }
                        ]
                    },
                    defaults: new_sale_phase
                })
                .then(sale_phase => sale_phase)
                .catch(_error => { throw new SalePhaseError("Ha ocurrido un error al tratar de crear la fase de venta.") });

            if (!created) throw new SalePhaseError("Ya existe una fase de venta con el mismo nombre o código");

            return SalePhasePresenter(new_sale_phase, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new SalePhaseError(error.message);
            else throw new Error('Ha ocurrido un error al crear la fase de venta.');
        }
    }
    async update(access: IAccessPermission, id: string, sale_phase: SalePhase): Promise<ISalePhaseResponse> {
        try {
            const sale_phase_exists = access.super_admin === true ?
                await SalePhaseModel.findOne({ where: { id } })
                    .then(sale_phase => sale_phase)
                    .catch(_error => { throw new SalePhaseError("Ha ocurrido un error al revisar la fase de venta.") }) :
                await SalePhaseModel.findOne({ where: { id, user_id: access.user_id } })
                    .then(sale_phase => sale_phase)
                    .catch(_error => { throw new SalePhaseError("Ha ocurrido un error al revisar la fase de venta.") });

            if (!sale_phase_exists) throw new SalePhaseError("No existe una fase de venta con el id proporcionado.");

            const sale_phase_coincidence = (sale_phase.name !== sale_phase_exists.dataValues.name || sale_phase.code !== sale_phase_exists.dataValues.code) ?
                await SalePhaseModel.findAll({
                    where: [
                        {
                            [Op.or]: [
                                { name: sale_phase.name },
                                { code: sale_phase.code }
                            ]
                        }
                    ]
                })
                    .then(sale_phase => sale_phase)
                    .catch(_error => { throw new SalePhaseError("Ha ocurrido un error al revisar la fase de venta.") }) :
                [];

            if (sale_phase_coincidence.length > 0) throw new SalePhaseError("Ya existe una fase de venta con el mismo nombre o código");

            sale_phase_exists.set({
                name: sale_phase.name ?? sale_phase_exists.dataValues.name,
                code: sale_phase.code ?? sale_phase_exists.dataValues.code,
                updatedAt: Date.now()
            });

            const updated = await sale_phase_exists.save()
                .then(sale_phase => sale_phase)
                .catch(_error => { throw new SalePhaseError("Ha ocurrido un error al actualizar la fase de venta.") });

            return SalePhasePresenter(updated.dataValues, access);
        } catch (error) {
            if (error instanceof Error && error.message) throw new SalePhaseError(error.message);
            else throw new Error('Ha ocurrido un error al actualizar la fase de venta.');
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<void | string> {
        try {
            const sale_phase_exists = access.super_admin === true ?
                await SalePhaseModel.findOne({ where: { id } })
                    .then(sale_phase => sale_phase)
                    .catch(_error => { throw new SalePhaseError("Ha ocurrido un error al revisar la fase de venta.") }) :
                await SalePhaseModel.findOne({ where: { id, user_id: access.user_id } })
                    .then(sale_phase => sale_phase)
                    .catch(_error => { throw new SalePhaseError("Ha ocurrido un error al revisar la fase de venta.") });

            if (!sale_phase_exists) throw new SalePhaseError("No existe una fase de venta con el id proporcionado.");

            sale_phase_exists.set({
                deleted: true,
                updatedAt: Date.now()
            });

            await sale_phase_exists.save().catch(_error => { throw new SalePhaseError("Ha ocurrido un error al eliminar la fase de venta.") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new SalePhaseError(error.message);
            else throw new Error('Ha ocurrido un error al eliminar la fase de venta.');
        }
    }
    async findAll(access: IAccessPermission): Promise<ISalePhaseResponse[]> {
        try {
            const sale_phases = access.super_admin === true ?
                await SalePhaseModel.findAll()
                    .then(sale_phases => sale_phases)
                    .catch(_error => { throw new SalePhaseError("Ha ocurrido un error al revisar las fases de venta.") }) :
                await SalePhaseModel.findAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access)
                        ]
                    })
                    .then(sale_phases => sale_phases)
                    .catch(_error => { throw new SalePhaseError("Ha ocurrido un error al revisar las fases de venta.") });

            return sale_phases.map(sale_phase => SalePhasePresenter(sale_phase.dataValues, access));
        } catch (error) {
            if (error instanceof Error && error.message) throw new SalePhaseError(error.message);
            else throw new Error('Ha ocurrido un error al obtener las fases de venta.');
        }
    }
}
const salePhaseDao = new SalePhaseDao();
export default salePhaseDao;