import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const degree_id: string = '6565635a-5561-f9ae-dcd8d9f0';
const degree_specification = {
    name: `DSpecification-NAME${Math.random().toString().slice(2, 10)}`,
    code: `DSpecification-CODE${Math.random().toString().slice(2, 10)}`,
    degree_id: degree_id,
}
let degree_specification_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/degree-specification", async function() {
    const response = await request.agent(app)
        .post('/api/v1/degree-specification')
        .set('x-user-token', user_token)
        .send(degree_specification)
        .then(response => response.body);
    degree_specification_id = response.id;
    expect(response).toStrictEqual({ 
        id: expect.any(String),
        name: degree_specification.name,
        code: degree_specification.code,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/degree-specification/:degree_id", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/degree-specification/${degree_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toBeInstanceOf(Array);
});

test.runIf(idDevelopment)("PUT /api/v1/degree-specification/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/degree-specification/${degree_specification_id}`)
        .set('x-user-token', user_token)
        .send(degree_specification)
        .then(response => response.body);
    expect(response).toStrictEqual({ 
        id: expect.any(String),
        name: degree_specification.name,
        code: degree_specification.code,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/degree-specification/:id", async function() {
    const response = await request.agent(app)
        .delete(`/api/v1/degree-specification/${degree_specification_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body)
    expect(response).toStrictEqual({
        message: expect.any(String),
    });
});