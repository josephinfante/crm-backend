import { ConnectClient } from "@aws-sdk/client-connect";
import { AWS_CONNECT_ACCESS_KEY_ID, AWS_CONNECT_REGION, AWS_CONNECT_SECRET_ACCESS_KEY } from "../../../../globals";

export const AWSConnect = new ConnectClient({
	credentials:{
		accessKeyId: AWS_CONNECT_ACCESS_KEY_ID,
		secretAccessKey: AWS_CONNECT_SECRET_ACCESS_KEY
	},
	region: AWS_CONNECT_REGION
});