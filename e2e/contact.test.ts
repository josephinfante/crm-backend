import { expect, test } from "vitest";
import * as request from "supertest";
import { ENV } from "../globals";
import { app } from "../src/app";

const idDevelopment = ENV === "development";

const login = {
    email: 'edmundoach@gmail.com',
    password: 'mypassword',
}
const contact = {
    first_name: `NAME${Math.random().toString().slice(2, 10)}`,
    last_name_1: `LASTNAME1${Math.random().toString().slice(2, 10)}`,
    last_name_2: `LASTNAME2${Math.random().toString().slice(2, 10)}`,
    mobile_number: Number(Math.random().toString().slice(2, 10)),
    phone_number: Number(Math.random().toString().slice(2, 10)),
    document_type: 'DNI',
    document_number: `DOCUMENT${Math.random().toString().slice(2, 10)}`,
    code: `CODE${Math.random().toString().slice(2, 10)}`,
    email_1: `EMAIL1${Math.random().toString().slice(2, 10)}@gmail.com`,
    email_2: `EMAIL2${Math.random().toString().slice(2, 10)}@gmail.com`,
    civil_status: 'SOLTERO',
    gender: 'MASCULINO',
    graduation_date: new Date(),
    whatsapp_number: Number(Math.random().toString().slice(2, 10)),
    address: 'santander 237 pueblo libre',
    address_reference: 'altura de la cuadra 14 de la brasil',
    accept_policies: true,
    accept_marketing: true,
    languages: [{
        id: '65651b33-0a75-cc66-35e12a21',
        native: true,
        level: 'alto',
        speak: 'alto',
        read:  'alto',
        listen: 'alto'
    }],
    college_id: '656620b9-f32f-f74a-34bda7a2',
    degree_specification_id: '65659dbd-541e-bcc1-9506b9bd',
    ethnicity_id: '656675a3-103b-0eaa-adfafd90',
    nationality_id: '65651b9a-00d6-c8ee-005ab5e2',
    country_id: '65651b86-73f8-9431-e21a27ee',
    district_id: '65676bc5-895e-1049-ad78a61a'
}
let contact_id: string = '';
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

test.runIf(idDevelopment)("POST /api/v1/contact", async function() {
    const response = await request.agent(app)
        .post('/api/v1/contact')
        .set('x-user-token', user_token)
        .send(contact)
        .then(response => response.body);
    contact_id = response.id;
    console.log(response)
    expect(response).toStrictEqual({
        id: expect.any(String),
        first_name: expect.any(String),
        last_name_1: expect.any(String),
        last_name_2: expect.any(String),
        mobile_number: expect.any(Number),
        phone_number: expect.any(Number),
        document_type: expect.any(String),
        document_number: expect.any(String),
        code: expect.any(String),
        email_1: expect.any(String),
        email_2: expect.any(String),
        civil_status: expect.any(String),
        gender: expect.any(String),
        graduation_date: expect.any(String),
        whatsapp_number: expect.any(Number),
        facebook_id: expect.any(String),
        instagram_id: expect.any(String),
        zipcode: expect.any(String),
        address: expect.any(String),
        address_reference: expect.any(String),
        languages: expect.any(Array),
        accept_policies: expect.any(Boolean),
        accept_marketing: expect.any(Boolean),
        college: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            type: expect.any(String),
            class: expect.any(String),
            level: expect.any(String),
            board: expect.any(String),
            is_competitor: expect.any(Boolean),
            priority: expect.any(Number),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
        },
        degree_specification: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
            degree_id: expect.any(String),
        },
        ethnicity: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
        },
        nationality: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
        },
        country: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
        },
        district: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
            city_id: expect.any(String),
        },
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    })
});

test.runIf(idDevelopment)("PUT /api/v1/contact/:id", async function() {
    const response = await request.agent(app)
        .put(`/api/v1/contact/${contact_id}`)
        .set('x-user-token', user_token)
        .send({ address: 'constantino carvallo 285 la victoria' })
        .then(response => response.body);
    expect(response).toStrictEqual({
        id: expect.any(String),
        first_name: expect.any(String),
        last_name_1: expect.any(String),
        last_name_2: expect.any(String),
        mobile_number: expect.any(Number),
        phone_number: expect.any(Number),
        document_type: expect.any(String),
        document_number: expect.any(String),
        code: expect.any(String),
        email_1: expect.any(String),
        email_2: expect.any(String),
        civil_status: expect.any(String),
        gender: expect.any(String),
        graduation_date: expect.any(String),
        whatsapp_number: expect.any(Number),
        facebook_id: expect.any(String),
        instagram_id: expect.any(String),
        zipcode: expect.any(String),
        address: expect.any(String),
        address_reference: expect.any(String),
        languages: expect.any(Array),
        accept_policies: expect.any(Boolean),
        accept_marketing: expect.any(Boolean),
        college: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            type: expect.any(String),
            class: expect.any(String),
            level: expect.any(String),
            board: expect.any(String),
            is_competitor: expect.any(Boolean),
            priority: expect.any(Number),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
        },
        degree_specification: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
            degree_id: expect.any(String),
        },
        ethnicity: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
        },
        nationality: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
        },
        country: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
        },
        district: {
            id: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            hidden: expect.any(Boolean),
            deleted: expect.any(Boolean),
            updatedAt: expect.any(Number),
            createdAt: expect.any(Number),
            city_id: expect.any(String),
        },
        hidden: expect.any(Boolean),
        deleted: expect.any(Boolean),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
    });
});

test.runIf(idDevelopment)("DELETE /api/v1/contact/:id", async function() {
    const response = await request.agent(app)
        .delete(`/api/v1/contact/${contact_id}`)
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({ message: expect.any(String) });
});

test.runIf(idDevelopment)("GET /api/v1/contacts", async function() {
    const response = await request.agent(app)
        .get('/api/v1/contacts')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        contacts: expect.any(Array),
        total_contacts: expect.any(Number),
        total_pages: expect.any(Number),
        current_page: expect.any(Number),
    });
});

test.runIf(idDevelopment)("GET /api/v1/contacts?page=1&value=:first_name", async function() {
    const response = await request.agent(app)
        .get('/api/v1/contacts?page=1&value=NAME05606007')
        .set('x-user-token', user_token)
        .then(response => response.body);
    expect(response).toStrictEqual({
        contacts: expect.any(Array),
        total_contacts: expect.any(Number),
        total_pages: expect.any(Number),
        current_page: expect.any(Number),
    });
});