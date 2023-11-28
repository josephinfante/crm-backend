import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const college = {
    name: `COLLEGE-NAME${Math.random().toString().slice(2, 10)}`,
    code: `COLLEGE-CODE${Math.random().toString().slice(2, 10)}`,
    type: 'COLLEGE-TYPE',
    class: 'COLLEGE-CLASS',
    level: 'COLLEGE-LEVEL',
    board: 'COLLEGE-BOARD',
    is_competitor: false,
    priority: 1,
}
let college_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/college", async function() {
    const response = await request.agent(app)
        .post('/api/v1/college')
        .set('x-user-token', user_token)
        .send(college)
        .then(response => response.body);
    college_id = response.id;
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: college.name,
        code: college.code,
        type: college.type,
        class: college.class,
        level: college.level,
        board: college.board,
        is_competitor: college.is_competitor,
        priority: college.priority,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/colleges/:college_name", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/colleges?college=${college.name}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual([{
        id: expect.any(String),
        name: college.name,
        code: college.code,
        type: college.type,
        class: college.class,
        level: college.level,
        board: college.board,
        is_competitor: college.is_competitor,
        priority: college.priority,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    }]);
});

test.runIf(idDevelopment)("GET /api/v1/colleges/:college_code", async function() {
    const response = await request.agent(app)
        .get(`/api/v1/colleges?college=${college.code}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual([{
        id: expect.any(String),
        name: college.name,
        code: college.code,
        type: college.type,
        class: college.class,
        level: college.level,
        board: college.board,
        is_competitor: college.is_competitor,
        priority: college.priority,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    }]);
});

test.runIf(idDevelopment)("GET /api/v1/colleges", async function() {
    const response = await request.agent(app)
        .get('/api/v1/colleges')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual(expect.any(Array));
});

test.runIf(idDevelopment)("PUT /api/v1/college/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/college/${college_id}`)
        .set('x-user-token', user_token)
        .send(college)
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: expect.any(String),
        name: college.name,
        code: college.code,
        type: college.type,
        class: college.class,
        level: college.level,
        board: college.board,
        is_competitor: college.is_competitor,
        priority: college.priority,
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        updatedAt: expect.any(Number),
        createdAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/college/:id", async function() {
    const response = await request.agent(app)
        .delete(`/api/v1/college/${college_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({message: expect.any(String)});
});
