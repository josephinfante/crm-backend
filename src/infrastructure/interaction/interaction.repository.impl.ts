import { InteractionRepository } from "../../domain/interaction/interaction.repository";
import { ICreateInteraction, IUpdateInteraction } from "../../domain/interaction/interaction.type";
import interactionDao from "./interaction.dao";

export class InteractionRepositoryImpl implements InteractionRepository {
    create(interaction: ICreateInteraction): Promise<void> {
        return interactionDao.create(interaction);
    }
    update(integration_id: string, interaction: IUpdateInteraction): Promise<void> {
        return interactionDao.update(integration_id, interaction);
    }
}