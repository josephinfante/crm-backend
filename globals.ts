import "dotenv/config";

export const ENV = process.env.ENV ?? "development";
export const PORT = process.env.PORT ?? 3000;

export const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS?.split(",") ?? ["http://localhost:3000"];

export const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

// Database
export const DB_HOST = process.env.DB_HOST ?? "localhost";
export const DB_NAME = process.env.DB_NAME ?? "usat";
export const DB_USERNAME = process.env.DB_USERNAME ?? "root";
export const DB_PASSWORD = process.env.DB_PASSWORD ?? "";