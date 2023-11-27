import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const user = {
    first_name: 'John',
    last_name: 'Doe',
    email: `john.doe${Math.random().toString()}@gmail.com`,
    password: '12345678',
    document_type: 'DNI',
    document_number: `${Math.random().toString().slice(2, 10)}`,
    phone_number: '123456789',
    role_id: '6564e7de-d22b-0c8e-58e8f657'
}
let user_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/user", async function() {
    const response = await request.agent(app)
        .post('/api/v1/user')
        .set('x-user-token', user_token)
        .send(user)
        .then(response => response.body);
    user_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        document_type: user.document_type,
        document_number: user.document_number,
        phone_number: user.phone_number,
        hidden: expect.any(Boolean),
        role: {
            id: user.role_id || '',
            name: expect.any(String) || '',
        },
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    })
});

test.runIf(idDevelopment)("GET /api/v1/user/:id", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/user/${user_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        document_type: user.document_type,
        document_number: user.document_number,
        phone_number: user.phone_number,
        hidden: expect.any(Boolean),
        role: {
            id: user.role_id,
            name: expect.any(String),
        },
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    })
});

test.runIf(idDevelopment)("GET /api/v1/users", async function() {
    const response = await request.agent(app)
        .get('/api/v1/users')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        users: expect.any(Array),
        total_users: expect.any(Number),
        total_pages: expect.any(Number),
        current_page: expect.any(Number),
    })
});

test.runIf(idDevelopment)("PUT /api/v1/user/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/user/${user_id}`)
        .set('x-user-token', user_token)
        .send({first_name: 'Jane'})
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: user_id,
        first_name: 'Jane',
        last_name: user.last_name,
        email: user.email,
        document_type: user.document_type,
        document_number: user.document_number,
        phone_number: user.phone_number,
        hidden: expect.any(Boolean),
        role: {
            id: user.role_id,
            name: expect.any(String),
        },
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    })
});

test.runIf(idDevelopment)("DELETE /api/v1/user/:id", async function() {
    const response = await request.agent(app)
        .delete(`/api/v1/user/${user_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({})
});