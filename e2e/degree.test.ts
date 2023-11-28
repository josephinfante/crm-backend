import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const degree = {
    name: `DEGREE-NAME${Math.random().toString().slice(2, 10)}`,
    code: `DEGREE-CODE${Math.random().toString().slice(2, 10)}`,
}
let degree_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/degree", async function() {
    const response = await request.agent(app)
        .post('/api/v1/degree')
        .set('x-user-token', user_token)
        .send(degree)
        .then(response => response.body);
    degree_id = response.id;
    expect(response).toStrictEqual({ 
        id: expect.any(String),
        name: degree.name,
        code: degree.code,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/degree/:id", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/degree/${degree_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({ 
        id: expect.any(String),
        name: degree.name,
        code: degree.code,
        degree_specifications: expect.any(Array),
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/degrees/:degree_name", async function() {
    const response = await request.agent(app)
        .get('/api/v1/degrees?degree=DEGREE-NAME60406392')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("GET /api/v1/degrees/:degree_code", async function() {
    const response = await request.agent(app)
        .get('/api/v1/degrees?degree=DEGREE-CODE17973900')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("GET /api/v1/degrees", async function() {
    const response = await request.agent(app)
        .get('/api/v1/degrees')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("PUT /api/v1/degree/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/degree/${degree_id}`)
        .set('x-user-token', user_token)
        .send({name: degree.name, code: degree.code})
        .then(response => response.body);
    expect(response).toStrictEqual({ 
        id: expect.any(String),
        name: degree.name,
        code: degree.code,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/degree/:id", async function() {
    const response = await request.agent(app)
        .delete(`/api/v1/degree/${degree_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
        expect(200);
    expect(response).toStrictEqual({
        message: expect.any(String),
    });
});