# CRM USAT

This is the API for the CRM USAT project, made to manage the information of the students of the USAT university.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Server Commands](#server-commands)
- [Migration Commands](#migration-commands)
- [ENV File](#env-file)

## Installation

1. Clone the repository:

   ```bash
   git clone git@bitbucket.org:usat/crm-backend.git
    ```

2. Navigate to the project directory:

   ```bash
   cd crm-backend
   ```

3. Install the dependencies using pnpm:

   ```bash
   pnpm install
   ```
   > **Note:** CRM USAT uses pnpm as the package manager. Make sure you have pnpm installed globally. If not, you can install it using npm install -g pnpm.

## Usage

1. Start the development server:

   ```bash
   pnpm run dev
   ```
    > **Note:** The development server will be started at http://localhost:3000 by default.

    > After you have run the dev server, make sure to create your super admin user, you can run the following command in mysql:
    > ```sql
    > INSERT INTO users (id, first_name, last_name, email, password, document_type, document_number, phone_number, super_admin, hidden, deleted, createdAt, updatedAt, role_id, user_id)
    > values ('super-admin-1234-5131k12', 'edmundo', 'acosta', 'edmundoach@gmail.com', '$2b$10$JsnxKkfqk.Bg4qJUpXC3HuZLqUeUvABdzT11E8SFFLBmCJtBRaquS', 'DNI', '12343214', '987654321', true, false, false, 1701109925936, 1701109925936, null, null);
    > ```

## Server Commands {#server-commands}

- `pnpm run dev` - Start the development server
- `pnpm run build` - Build the project
- `pnpm run start` - Start the production server
- `pnpm run test` - Run the tests

## Migration Commands {#migration-commands}

- `pnpm run migrate:countries` - Migrate the countries
- `pnpm run migrate:nationalities` - Migrate the nationalities
- `pnpm run migrate:languages` - Migrate the languages
- `pnpm run migrate:components` - Migrate the components
- `pnpm run migrate:pages` - Migrate the pages

## ENV File {#env-file}

- `ENV` - Environment of the server
- `PORT` - Port where the server will be started
- `ACCEPTED_ORIGINS` - Accepted origins for the CORS
- `JWT_SECRET` - Secret for the JWT
- `DB_HOST` - Host of the database
- `DB_USERNAME` - User of the database
- `DB_PASSWORD` - Password of the database
- `DB_NAME` - Name of the database

> **Note:** Create your .env file in your root directory.
