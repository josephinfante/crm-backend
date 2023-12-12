import { ICreateInteraction, IUpdateInteraction } from "./interaction.type";

export interface InteractionRepository {
    create(interaction: ICreateInteraction): Promise<void>;
    update(integration_id: string, interaction: IUpdateInteraction): Promise<void>;
}