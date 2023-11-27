import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const page = {
    name: `ADMIN${Math.random().toString().slice(2, 10)}`,
    external_url: `ADMIN${Math.random().toString().slice(2, 10)}.com`,
}
let page_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/page", async function() {
    const response = await request.agent(app)
        .post('/api/v1/page')
        .set('x-user-token', user_token)
        .send(page)
        .then(response => response.body);
    page_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: page.name,
        internal_url: null,
        external_url: page.external_url,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/page/:id", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/page/${page_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: page.name,
        internal_url: null,
        external_url: page.external_url,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/pages", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/pages`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("PUT /api/v1/page/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/page/${page_id}`)
        .set('x-user-token', user_token)
        .send(page)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: page_id,
        name: page.name,
        internal_url: null,
        external_url: page.external_url,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/page/:id", async function() {
    await request.agent(app)
        .delete(`/api/v1/page/${page_id}`)
        .set('x-user-token', user_token)
        .expect(204)
});