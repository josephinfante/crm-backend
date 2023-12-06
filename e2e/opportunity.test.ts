import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const opportunity = {
    reserved_enrollment: 1,
    reserved_period: 1,
    postulation_type: `POSTULATION-TYPE${Math.random().toString().slice(2, 10)}`,
    postulation_date: Date.now(),
    tentative_enrollment_date: Date.now(),
    termination_motive: 2,
    competitor: `COMPETITOR${Math.random().toString().slice(2, 10)}`,
    migration_code: `MIGRATION-CODE${Math.random().toString().slice(2, 10)}`,
    last_interaction: `LAST-INTERACTION${Math.random().toString().slice(2, 10)}`,
    interest_level: 3,
    registration_form_date: Date.now(),
    purpose_full_interaction: 2,
    contact_id: '6567d722-7826-ffd0-c05807d5',
    career_id: '6566eac6-cee7-280c-bfb717c9',
    period_id: '656ea4e5-79e5-7d12-5f40addc',
    campus_id: '6566ded4-9833-884a-0a04ebd5',
    business_unit_id: '65669279-ccdc-e51d-a1017e10',
    sale_phase_id: '656eaa99-be47-6e35-04c5f412',
    contact_channel_id: '6568423b-4a91-ccbd-48fd7555',
}
let opportunity_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/opportunity", async function() {
    const response = await request.agent(app)
        .post('/api/v1/opportunity')
        .set('x-user-token', user_token)
        .send(opportunity)
        .then(response => response.body);
    opportunity_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        reserved_enrollment: opportunity.reserved_enrollment,
        reserved_period: opportunity.reserved_period,
        postulation_type: opportunity.postulation_type,
        postulation_date: opportunity.postulation_date,
        tentative_enrollment_date: opportunity.tentative_enrollment_date,
        termination_motive: opportunity.termination_motive,
        competitor: opportunity.competitor,
        migration_code: opportunity.migration_code,
        last_interaction: opportunity.last_interaction,
        interest_level: opportunity.interest_level,
        registration_form_date: opportunity.registration_form_date,
        purpose_full_interaction: opportunity.purpose_full_interaction,
        contact: expect.any(Object),
        career: expect.any(Object),
        period: expect.any(Object),
        campus: expect.any(Object),
        business_unit: expect.any(Object),
        sale_phase: expect.any(Object),
        contact_channel: expect.any(Object),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/opportunity/:id", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/opportunity/${opportunity_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: expect.any(String),
        reserved_enrollment: opportunity.reserved_enrollment,
        reserved_period: opportunity.reserved_period,
        postulation_type: opportunity.postulation_type,
        postulation_date: opportunity.postulation_date,
        tentative_enrollment_date: opportunity.tentative_enrollment_date,
        termination_motive: opportunity.termination_motive,
        competitor: opportunity.competitor,
        migration_code: opportunity.migration_code,
        last_interaction: opportunity.last_interaction,
        interest_level: opportunity.interest_level,
        registration_form_date: opportunity.registration_form_date,
        purpose_full_interaction: opportunity.purpose_full_interaction,
        contact: expect.any(Object),
        career: expect.any(Object),
        period: expect.any(Object),
        campus: expect.any(Object),
        business_unit: expect.any(Object),
        sale_phase: expect.any(Object),
        contact_channel: expect.any(Object),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/opportunities", async function() {
    const response = await request.agent(app)
        .get('/api/v1/opportunities')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        opportunities: expect.any(Array),
        total_opportunity: expect.any(Number),
        total_pages: expect.any(Number),
        current_page: expect.any(Number),
    });
});

test.runIf(idDevelopment)("PUT /api/v1/opportunity/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/opportunity/${opportunity_id}`)
        .set('x-user-token', user_token)
        .send(opportunity)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: expect.any(String),
        reserved_enrollment: opportunity.reserved_enrollment,
        reserved_period: opportunity.reserved_period,
        postulation_type: opportunity.postulation_type,
        postulation_date: opportunity.postulation_date,
        tentative_enrollment_date: opportunity.tentative_enrollment_date,
        termination_motive: opportunity.termination_motive,
        competitor: opportunity.competitor,
        migration_code: opportunity.migration_code,
        last_interaction: opportunity.last_interaction,
        interest_level: opportunity.interest_level,
        registration_form_date: opportunity.registration_form_date,
        purpose_full_interaction: opportunity.purpose_full_interaction,
        contact: expect.any(Object),
        career: expect.any(Object),
        period: expect.any(Object),
        campus: expect.any(Object),
        business_unit: expect.any(Object),
        sale_phase: expect.any(Object),
        contact_channel: expect.any(Object),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/opportunity/:id", async function() {
    await request.agent(app)
        .delete(`/api/v1/opportunity/${opportunity_id}`)
        .set('x-user-token', user_token)
        .expect(204)
});
