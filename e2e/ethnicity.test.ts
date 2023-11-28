import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const ethnicity = {
    name: `ETHNICITY-NAME${Math.random().toString().slice(2, 10)}`,
    code: `ETHNICITY-CODE${Math.random().toString().slice(2, 10)}`,
}
let ethnicity_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/ethnicity", async function() {
    const response = await request.agent(app)
        .post('/api/v1/ethnicity')
        .set('x-user-token', user_token)
        .send(ethnicity)
        .then(response => response.body);
    ethnicity_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: ethnicity.name,
        code: ethnicity.code,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/ethnicities?ethnicity=:string", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/ethnicities?ethnicity=${ethnicity.name}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});


test.runIf(idDevelopment)("GET /api/v1/ethnicities?ethnicity=:string", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/ethnicities?ethnicity=${ethnicity.code}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("GET /api/v1/ethnicities", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/ethnicities`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("PUT /api/v1/ethnicity/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/ethnicity/${ethnicity_id}`)
        .set('x-user-token', user_token)
        .send({name: ethnicity.name, code: ethnicity.code})
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: ethnicity_id,
        name: ethnicity.name,
        code: ethnicity.code,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/ethnicity/:id", async function() {
    const response = await request.agent(app)
        .delete(`/api/v1/ethnicity/${ethnicity_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({ message: expect.any(String) });
});