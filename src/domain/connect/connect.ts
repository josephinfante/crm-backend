import { IConnect } from "./connect.type";

export class Connect {
    version: string;
    id: string;
    'detail-type': string;
    source: string;
    account: string;
    time: string;
    region: string;
    resources: string[];
    detail: {
        eventType: string;
        contactId: string;
        channel: string;
        instanceArn: string;
        initiationMethod: string;
        queueInfo?: {
            queueArn: string;
            enqueueTimestamp: string;
            queueType: string;
        },
        agentInfo?: {
            agentArn: string;
            connectedToAgentTimestamp: string;
        },
        initiationTimestamp: string;
        connectedToSystemTimestamp?: string;
        disconnectTimestamp?: string;
        segmentAttributes: { 
            'connect:Subtype': {};
        },
        contactLens?: { 
            conversationalAnalytics: {} 
        }
    }
    constructor(connect: IConnect) {
        this.version = connect.version;
        this.id = connect.id;
        this['detail-type'] = connect['detail-type'];
        this.source = connect.source;
        this.account = connect.account;
        this.time = connect.time;
        this.region = connect.region;
        this.resources = connect.resources;
        this.detail = connect.detail;
    }
}