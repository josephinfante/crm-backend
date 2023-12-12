import { Connect } from "./connect";

export interface ConnectRepository {
    webhook(connect: Connect): Promise<void>;
}