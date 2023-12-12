export interface IConnect {
    version: string;
    id: string;
    'detail-type': string;
    source: string;
    account: string;
    time: string;
    region: string;
    resources: string[],
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
}