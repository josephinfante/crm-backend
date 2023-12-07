import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const contact_channel = {
    name: `CONTACTCHANNEL-NAME${Math.random().toString().slice(2, 10)}`,
    code: `CONTACTCHANNEL-CODE${Math.random().toString().slice(2, 10)}`,
    automatic_assignment: true,
    manual_assignment: true,
    send_email: true,
    send_sms: true,
    send_note: true,
    expire_days: 30,
}
let contact_channel_id: string = '';
let user_token: string = '';

test.runIf(idDevelopment)("POST /api/v1/login", async function() {
    const response = await request.agent(app)
        .post('/api/v1/login')
        .send({email: login.email, password: login.password})
        .then(response => response.body);
    user_token = response.token;
    expect(response).toStrictEqual({
        id: expect.any(String),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: login.email,
        document_number: expect.any(String),
        document_type: expect.any(String),
        phone_number: expect.any(String),
        token: expect.any(String),
        pages: expect.any(Array),
        permissions: expect.any(Array),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("POST /api/v1/contact-channel", async function() {
    const response = await request.agent(app)
        .post('/api/v1/contact-channel')
        .set('x-user-token', user_token)
        .send(contact_channel)
        .then(response => response.body);
    contact_channel_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: contact_channel.name,
        code: contact_channel.code,
        automatic_assignment: contact_channel.automatic_assignment,
        manual_assignment: contact_channel.manual_assignment,
        send_email: contact_channel.send_email,
        send_sms: contact_channel.send_sms,
        send_note: contact_channel.send_note,
        expire_days: contact_channel.expire_days,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/contact-channels", async function() {
    const response = await request.agent(app)
        .get('/api/v1/contact-channels')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toBeInstanceOf(Array);
});

test.runIf(idDevelopment)("PUT /api/v1/contact-channel/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/contact-channel/${contact_channel_id}`)
        .set('x-user-token', user_token)
        .send({
            name: `UPDATECC-NAME-${Math.random().toString().slice(2, 10)}`, 
            code: `UPDATECC-CODE-${Math.random().toString().slice(2, 10)}`
        })
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: expect.any(String),
        code: expect.any(String),
        automatic_assignment: contact_channel.automatic_assignment,
        manual_assignment: contact_channel.manual_assignment,
        send_email: contact_channel.send_email,
        send_sms: contact_channel.send_sms,
        send_note: contact_channel.send_note,
        expire_days: contact_channel.expire_days,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/contact-channel/:id", async function() {
    await request.agent(app)
        .delete(`/api/v1/contact-channel/${contact_channel_id}`)
        .set('x-user-token', user_token)
        .expect(204);
});