import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
let component_id: string = '';
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

test.runIf(idDevelopment)("GET /api/v1/components", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/components`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    component_id = response[0].id;
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("GET /api/v1/component/:id", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/component/${component_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});
