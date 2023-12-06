import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const business_unit = {
    name: `BUSINESSUNIT-NAME${Math.random().toString().slice(2, 10)}`,
    nickname: `BUSINESSUNIT-NICKNAME${Math.random().toString().slice(2, 10)}`,
    code: `BUSINESSUNIT-CODE${Math.random().toString().slice(2, 10)}`,
    degree_id: '6565635a-5561-f9ae-dcd8d9f0',
    current_period: '1',
    default_career: '1',
    next_period: '2',
}
let business_unit_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/business-unit", async function() {
    const response = await request.agent(app)
        .post('/api/v1/business-unit')
        .set('x-user-token', user_token)
        .send(business_unit)
        .then(response => response.body);
    business_unit_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: business_unit.name,
        nickname: business_unit.nickname,
        code: business_unit.code,
        degree: {
            id: expect.any(String),
            name: expect.any(String),
        },
        current_period: expect.any(String),
        default_career: expect.any(String),
        next_period: expect.any(String),
        hidden: false,
        deleted: false,
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/business-units?business_unit=:string", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/business-units?business_unit=${business_unit.name}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("GET /api/v1/business-units?business_unit=:string", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/business-units?business_unit=${business_unit.nickname}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("GET /api/v1/business-units?business_unit=:string", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/business-units?business_unit=${business_unit.code}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("GET /api/v1/business-units", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/business-units`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("PUT /api/v1/business-unit/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/business-unit/${business_unit_id}`)
        .set('x-user-token', user_token)
        .send(business_unit)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: business_unit_id,
        name: business_unit.name,
        nickname: business_unit.nickname,
        code: business_unit.code,
        degree: {
            id: expect.any(String),
            name: expect.any(String),
        },
        current_period: expect.any(String),
        default_career: expect.any(String),
        next_period: expect.any(String),
        hidden: false,
        deleted: false,
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/business-unit/:id", async function() {
    await request.agent(app)
        .delete(`/api/v1/business-unit/${business_unit_id}`)
        .set('x-user-token', user_token)
        .expect(204)
});