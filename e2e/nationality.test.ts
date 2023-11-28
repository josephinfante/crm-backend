import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const nationality = {
    name: `NATIONALITY-NAME${Math.random().toString().slice(2, 10)}`,
    code: `NATIONALITY-CODE${Math.random().toString().slice(2, 10)}`,
}
let nationality_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/nationality", async function() {
    const response = await request.agent(app)
        .post('/api/v1/nationality')
        .set('x-user-token', user_token)
        .send(nationality)
        .then(response => response.body);
    nationality_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: nationality.name,
        code: nationality.code,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/nationalities?nationality=:string", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/nationalities?nationality=${nationality.name}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});


test.runIf(idDevelopment)("GET /api/v1/nationalities?nationality=:string", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/nationalities?nationality=${nationality.code}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("GET /api/v1/nationalities", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/nationalities`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("PUT /api/v1/nationality/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/nationality/${nationality_id}`)
        .set('x-user-token', user_token)
        .send({name: nationality.name, code: nationality.code})
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: nationality_id,
        name: nationality.name,
        code: nationality.code,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/nationality/:id", async function() {
    const response = await request.agent(app)
        .delete(`/api/v1/nationality/${nationality_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({ message: expect.any(String) });
});