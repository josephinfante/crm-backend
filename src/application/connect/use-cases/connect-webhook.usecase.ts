import { Connect } from "../../../domain/connect/connect";
import { ConnectRepository } from "../../../domain/connect/connect.repository";

export class ConnectWebhookUseCase {
    constructor(private readonly connectRepository: ConnectRepository) {}
    async webhook(connect: Connect): Promise<void> {
        return this.connectRepository.webhook(connect);
    }
}