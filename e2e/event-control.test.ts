import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const event_control = {
    confirmed: true,
    attended: true,
    will_apply: true,
    qr_url: `QRURL-${Math.random().toString().slice(2, 10)}`,
    event_url: `EVENTURL-${Math.random().toString().slice(2, 10)}`,
    post_event_url: `POSTEVENTURL-${Math.random().toString().slice(2, 10)}`,
    sent_sms: true,
    sent_email: true,
    event_id: '65715441-d20f-f1de-53f8b622',
    contact_id: '6567d722-7826-ffd0-c05807d5',
    opportunity_id: '656fbaf7-36b9-813c-c0622e0d'
}
let event_control_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/event-control", async function() {
    const response = await request.agent(app)
        .post('/api/v1/event-control')
        .set('x-user-token', user_token)
        .send(event_control)
        .then(response => response.body);
    event_control_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        confirmed: event_control.confirmed,
        attended: event_control.attended,
        will_apply: event_control.will_apply,
        qr_url: event_control.qr_url,
        event_url: event_control.event_url,
        post_event_url: event_control.post_event_url,
        sent_sms: event_control.sent_sms,
        sent_email: event_control.sent_email,
        event: expect.any(Object),
        contact: expect.any(Object),
        opportunity: expect.any(Object),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/event-controls", async function() {
    const response = await request.agent(app)
        .get('/api/v1/event-controls')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        event_controls: expect.any(Array),
        total_event_control: expect.any(Number),
        total_pages: expect.any(Number),
        current_page: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/event-control/:id", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/event-control/${event_control_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: expect.any(String),
        confirmed: event_control.confirmed,
        attended: event_control.attended,
        will_apply: event_control.will_apply,
        qr_url: event_control.qr_url,
        event_url: event_control.event_url,
        post_event_url: event_control.post_event_url,
        sent_sms: event_control.sent_sms,
        sent_email: event_control.sent_email,
        event: expect.any(Object),
        contact: expect.any(Object),
        opportunity: expect.any(Object),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("PUT /api/v1/event-control/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/event-control/${event_control_id}`)
        .set('x-user-token', user_token)
        .send(event_control)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: expect.any(String),
        confirmed: event_control.confirmed,
        attended: event_control.attended,
        will_apply: event_control.will_apply,
        qr_url: event_control.qr_url,
        event_url: event_control.event_url,
        post_event_url: event_control.post_event_url,
        sent_sms: event_control.sent_sms,
        sent_email: event_control.sent_email,
        event: expect.any(Object),
        contact: expect.any(Object),
        opportunity: expect.any(Object),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/event-control/:id", async function() {
    await request.agent(app)
        .delete(`/api/v1/event-control/${event_control_id}`)
        .set('x-user-token', user_token)
        .expect(204);
});