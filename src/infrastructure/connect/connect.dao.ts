import { GetContactAttributesCommand } from "@aws-sdk/client-connect";
import { IConnect } from "../../domain/connect/connect.type";
import { AWS_CONNECT_INSTANCE_ID, SUPER_ADMIN_ID } from "../../../globals";
import { AWSConnect } from "../../shared/connections/aws/connect.aws";
import { ContactModel, OpportunityModel } from "../../shared/models";
import { Op } from "sequelize";
import { UniqueID } from "../../shared/utils";
import interactionDao from "../interaction/interaction.dao";

class ConnectDao {
    async webhook(connect: IConnect) {
        try {
            const command = new GetContactAttributesCommand({
                InstanceId: AWS_CONNECT_INSTANCE_ID,
                InitialContactId: connect.detail.contactId
            })
            const response = await AWSConnect.send(command);
            const phone = response.Attributes?.phone;

            const contact = await ContactModel.findOne({ 
                    where: {
                        [Op.or]: [
                            { mobile_number: phone },
                            { phone_number: phone },
                        ]
                    },
                    order: [['updatedAt', 'DESC']]
                })
                .then(contact => contact)
                .catch((_error) => { throw new Error("Ha ocurrido un error al tratar de buscar el contacto") });

            if (contact) {
                // Search las updated opportunity from contact
                let last_opportunity = await OpportunityModel.findOne({
                        where: { contact_id: contact.dataValues.id },
                        order: [['updatedAt', 'DESC']]
                    })
                    .then(last_opportunity => last_opportunity)
                    .catch((_error) => { throw new Error("Ha ocurrido un error al tratar de buscar la oportunidad") });

                if (!last_opportunity) {
                    last_opportunity = await OpportunityModel.create({
                            id: UniqueID.generate(),
                            contact_id: contact.dataValues.id,
                            user_id: SUPER_ADMIN_ID,
                        })
                        .then(last_opportunity => last_opportunity)
                        .catch((_error) => { throw new Error("Ha ocurrido un error al tratar de crear la oportunidad") });
                }

                await InteractionFlow(connect, phone as string, last_opportunity?.dataValues.id);
                return;
            }
            const contact_id = UniqueID.generate();
            const opportunity_id = UniqueID.generate();

            await ContactModel.create({
                    id: contact_id,
                    mobile_number: phone,
                    user_id: SUPER_ADMIN_ID,
                }).catch((_error) => { throw new Error("Ha ocurrido un error al tratar de crear el contacto") });
            await OpportunityModel.create({
                    id: opportunity_id,
                    contact_id: contact_id,
                    user_id: SUPER_ADMIN_ID,
                }).catch((_error) => { throw new Error("Ha ocurrido un error al tratar de crear la oportunidad") });
            
            await InteractionFlow(connect, phone as string, opportunity_id);
            return;
        } catch (error) {
            throw error;
        }
    }
}

async function InteractionFlow(connect: IConnect, phone: string, opportunity_id: string) {
    if (connect.detail?.disconnectTimestamp) {
        await interactionDao.update(
            connect.detail.contactId, // integration_id
            {end_interaction_date: new Date(connect.detail.disconnectTimestamp).getTime()}
        );
        return;
    }

    if (connect.detail?.agentInfo?.connectedToAgentTimestamp) {
        await interactionDao.update(
            connect.detail.contactId, // integration_id
            {end_hold_date: new Date(connect.detail.agentInfo.connectedToAgentTimestamp).getTime()}
        );
        return;
    }

    if (connect.detail?.queueInfo?.enqueueTimestamp) {
        await interactionDao.update(
            connect.detail.contactId, // integration_id
            {start_hold_date: new Date(connect.detail.queueInfo.enqueueTimestamp).getTime()}
        );
        return;
    }

    if (connect.detail?.initiationTimestamp && connect.detail.eventType == 'INITIATED') {
        await interactionDao.create({
            phone: phone,
            contact_channel_type: connect.detail.initiationMethod,
            integration_id: connect.detail.contactId,
            start_interaction_date: new Date(connect.detail.initiationTimestamp).getTime(),
            viewed: true,
            opportunity_id: opportunity_id,
        });
        return;
    }
}

const connectDao = new ConnectDao();
export default connectDao;
