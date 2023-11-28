import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const language = {
    name: `LANGUAGE-NAME${Math.random().toString().slice(2, 10)}`,
    code: `LANGUAGE-CODE${Math.random().toString().slice(2, 10)}`,
}
let language_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/language", async function() {
    const response = await request.agent(app)
        .post('/api/v1/language')
        .set('x-user-token', user_token)
        .send(language)
        .then(response => response.body);
    language_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: language.name,
        code: language.code,
        hidden: false,
        deleted: false,
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/languages?language=:string", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/languages?language=${language.name}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});


test.runIf(idDevelopment)("GET /api/v1/languages?language=:string", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/languages?language=${language.code}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("GET /api/v1/languages", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/languages`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("PUT /api/v1/language/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/language/${language_id}`)
        .set('x-user-token', user_token)
        .send({name: language.name, code: language.code})
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: language_id,
        name: language.name,
        code: language.code,
        hidden: false,
        deleted: false,
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/language/:id", async function() {
    const response = await request.agent(app)
        .delete(`/api/v1/language/${language_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({ message: expect.any(String) });
});