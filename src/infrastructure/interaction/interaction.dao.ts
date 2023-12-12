import { SUPER_ADMIN_ID } from "../../../globals";
import { ICreateInteraction, IUpdateInteraction } from "../../domain/interaction/interaction.type";
import { CollegeError, ContactChannelError, InteractionError, OpportunityError } from "../../shared/errors";
import { CollegeModel, ContactChannelModel, InteractionModel, OpportunityModel } from "../../shared/models";
import { UniqueID } from "../../shared/utils";

class InteractionDao {
    async create(interaction: ICreateInteraction): Promise<void> {
        try {
            let opportunity;
            let college;
            let contact_channel;
            if (interaction.opportunity_id) {
                opportunity = await OpportunityModel.findOne({
                        where: { id: interaction.opportunity_id },
                    })
                    .then(opportunity => opportunity)
                    .catch((_error) => { throw new OpportunityError("Ha ocurrido un error al revisar la oportunidad") })

                if (!opportunity) throw new OpportunityError("La oportunidad no existe")
            }
            if (interaction.college_id) {
                college = await CollegeModel.findOne({ 
                        where: { id: interaction.college_id },
                    })
                    .then(college => college)
                    .catch((_error) => { throw new CollegeError("Ha ocurrido un error al revisar la institución educativa") });

                if (!college) throw new CollegeError("La institución educativa no existe")
            }
            if (interaction.contact_channel_id) {
                contact_channel = await ContactChannelModel.findOne({ 
                        where: { id: interaction.contact_channel_id },
                    })
                
                if (!contact_channel) throw new ContactChannelError("El canal de contacto no existe")
            }
            const new_interaction = {
                id: UniqueID.generate(),
                email: interaction.email ?? null,
                phone: interaction.phone ?? null,
                contact_channel_type: interaction.contact_channel_type ?? null,
                integration_id: interaction.integration_id ?? null,
                start_interaction_date: interaction.start_interaction_date ?? null,
                start_hold_date: interaction.start_hold_date ?? null,
                end_hold_date: interaction.end_hold_date ?? null,
                end_interaction_date: interaction.end_interaction_date ?? null,
                tracking_date: interaction.tracking_date ?? null,
                next_interaction_date: interaction.next_interaction_date ?? null,
                viewed: interaction.viewed ?? null,
                comment: interaction.comment ?? null,
                opportunity_id: interaction.opportunity_id ?? null,
                college_id: interaction.college_id ?? null,
                contact_channel_id: interaction.contact_channel_id ?? null,
                hidden: false,
                deleted: false,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                user_id: SUPER_ADMIN_ID,
            }

            const [_interaction, created] = await InteractionModel.findOrCreate({
                    where: { integration_id: interaction.integration_id },
                    defaults: new_interaction,
                })
                .then(interaction => interaction)
                .catch((_error) => { throw new InteractionError("Ha ocurrido un error al tratar de crear la interacción") });

            if (!created) {
                await this.update(_interaction.dataValues.integration_id, _interaction.dataValues);
            }
        } catch (error) {
            if (error instanceof Error && error.message) throw new InteractionError(error.message);
            else throw new Error('Ha ocurrido un error al crear la interacción.');
        }
    }
    async update(integration_id: string, interaction: IUpdateInteraction): Promise<void> {
        try {
            const last_interaction = await InteractionModel.findOne({
                    where: { integration_id },
                })
                .then(interaction => interaction)
                .catch((_error) => { throw new InteractionError("Ha ocurrido un error al revisar la última interacción") });

            if (!last_interaction) throw new InteractionError("La última interacción no existe")

            last_interaction.set({
                    email: interaction.email ?? last_interaction.dataValues.email,
                    phone: interaction.phone ?? last_interaction.dataValues.phone,
                    contact_channel_type: interaction.contact_channel_type ?? last_interaction.dataValues.contact_channel_type,
                    start_interaction_date: interaction.start_interaction_date ?? last_interaction.dataValues.start_interaction_date,
                    start_hold_date: interaction.start_hold_date ?? last_interaction.dataValues.start_hold_date,
                    end_hold_date: interaction.end_hold_date ?? last_interaction.dataValues.end_hold_date,
                    end_interaction_date: interaction.end_interaction_date ?? last_interaction.dataValues.end_interaction_date,
                    tracking_date: interaction.tracking_date ?? last_interaction.dataValues.tracking_date,
                    next_interaction_date: interaction.next_interaction_date ?? last_interaction.dataValues.next_interaction_date,
                    viewed: interaction.viewed ?? last_interaction.dataValues.viewed,
                    comment: interaction.comment ?? last_interaction.dataValues.comment,
                    opportunity_id: interaction.opportunity_id ?? last_interaction.dataValues.opportunity_id,
                    college_id: interaction.college_id ?? last_interaction.dataValues.college_id,
                    contact_channel_id: interaction.contact_channel_id ?? last_interaction.dataValues.contact_channel_id,
                    hidden: interaction.hidden ?? last_interaction.dataValues.hidden,
                    updatedAt: Date.now()
                });
            
            await last_interaction.save().catch((_error) => { throw new InteractionError("Ha ocurrido un error al tratar de actualizar la interacción") });
        } catch (error) {
            if (error instanceof Error && error.message) throw new InteractionError(error.message);
            else throw new Error('Ha ocurrido un error al actualizar la interacción.');
        }
    }
}
const interactionDao = new InteractionDao();
export default interactionDao;