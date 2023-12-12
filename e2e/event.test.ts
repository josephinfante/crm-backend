import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const event = {
    name: `EVENTNAME-${Math.random().toString().slice(2, 10)}`,
    code: `EVENTCODE-${Math.random().toString().slice(2, 10)}`,
    type: `EVENTTYPE-${Math.random().toString().slice(2, 10)}`,
    address: `EVENTADDRESS-${Math.random().toString().slice(2, 10)}`,
    campaign_start_date: Date.now(),
    start_date: Date.now(),
    end_date: Date.now(),
    waiting_time: 1,
    send_sms: true,
    send_email: true,
    registration_form_expected: Date.now(),
    registration_form_delivered: Date.now(),
    registration_form_completed: Date.now(),
    registration_form_incompleted: Date.now(),
    virtual: true,
    pre_inscription_url: `PREINSCRIPTIONURL-${Math.random().toString().slice(2, 10)}`,
    post_event_url: `POSTEVENTURL-${Math.random().toString().slice(2, 10)}`,
    meeting_url: `MEETINGURL-${Math.random().toString().slice(2, 10)}`,
    survery_url: `SURVERYURL-${Math.random().toString().slice(2, 10)}`,
    send_survey: true,
    sent_pre_inscription: true,
    inscription_type: `INSCRIPTIONTYPE-${Math.random().toString().slice(2, 10)}`,
    campus_id: '6566ded4-9833-884a-0a04ebd5',
    college_id: '656620b9-f32f-f74a-34bda7a2',
}
let event_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/event", async function() {
    const response = await request.agent(app)
        .post('/api/v1/event')
        .set('x-user-token', user_token)
        .send(event)
        .then(response => response.body);
    event_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: event.name,
        code: event.code,
        type: event.type,
        address: event.address,
        campaign_start_date: event.campaign_start_date,
        start_date: event.start_date,
        end_date: event.end_date,
        waiting_time: event.waiting_time,
        send_sms: event.send_sms,
        send_email: event.send_email,
        registration_form_expected: event.registration_form_expected,
        registration_form_delivered: event.registration_form_delivered,
        registration_form_completed: event.registration_form_completed,
        registration_form_incompleted: event.registration_form_incompleted,
        virtual: event.virtual,
        pre_inscription_url: event.pre_inscription_url,
        post_event_url: event.post_event_url,
        meeting_url: event.meeting_url,
        survery_url: event.survery_url,
        send_survey: event.send_survey,
        sent_pre_inscription: event.sent_pre_inscription,
        inscription_type: event.inscription_type,
        campus: expect.any(Object),
        college: expect.any(Object),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/event/:id", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/event/${event_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: event_id,
        name: event.name,
        code: event.code,
        type: event.type,
        address: event.address,
        campaign_start_date: event.campaign_start_date,
        start_date: event.start_date,
        end_date: event.end_date,
        waiting_time: event.waiting_time,
        send_sms: event.send_sms,
        send_email: event.send_email,
        registration_form_expected: event.registration_form_expected,
        registration_form_delivered: event.registration_form_delivered,
        registration_form_completed: event.registration_form_completed,
        registration_form_incompleted: event.registration_form_incompleted,
        virtual: event.virtual,
        pre_inscription_url: event.pre_inscription_url,
        post_event_url: event.post_event_url,
        meeting_url: event.meeting_url,
        survery_url: event.survery_url,
        send_survey: event.send_survey,
        sent_pre_inscription: event.sent_pre_inscription,
        inscription_type: event.inscription_type,
        campus: expect.any(Object),
        college: expect.any(Object),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/events", async function() {
    const response = await request.agent(app)
        .get('/api/v1/events')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        events: expect.any(Array),
        total_events: expect.any(Number),
        total_pages: expect.any(Number),
        current_page: expect.any(Number),
    });
});

test.runIf(idDevelopment)("PUT /api/v1/event/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/event/${event_id}`)
        .set('x-user-token', user_token)
        .send(event)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: event_id,
        name: event.name,
        code: event.code,
        type: event.type,
        address: event.address,
        campaign_start_date: event.campaign_start_date,
        start_date: event.start_date,
        end_date: event.end_date,
        waiting_time: event.waiting_time,
        send_sms: event.send_sms,
        send_email: event.send_email,
        registration_form_expected: event.registration_form_expected,
        registration_form_delivered: event.registration_form_delivered,
        registration_form_completed: event.registration_form_completed,
        registration_form_incompleted: event.registration_form_incompleted,
        virtual: event.virtual,
        pre_inscription_url: event.pre_inscription_url,
        post_event_url: event.post_event_url,
        meeting_url: event.meeting_url,
        survery_url: event.survery_url,
        send_survey: event.send_survey,
        sent_pre_inscription: event.sent_pre_inscription,
        inscription_type: event.inscription_type,
        campus: expect.any(Object),
        college: expect.any(Object),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/event/:id", async function() {
    await request.agent(app)
        .delete(`/api/v1/event/${event_id}`)
        .set('x-user-token', user_token)
        .expect(204);
});

