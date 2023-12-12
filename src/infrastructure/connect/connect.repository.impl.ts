import { Connect } from "../../domain/connect/connect";
import { ConnectRepository } from "../../domain/connect/connect.repository";
import connectDao from "./connect.dao";

export class ConnectRepositoryImpl implements ConnectRepository {
    webhook(connect: Connect): Promise<void> {
        return connectDao.webhook(connect);
    }
}