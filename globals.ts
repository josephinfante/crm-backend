import "dotenv/config";

export const ENV = process.env.ENV ?? "development";
export const PORT = process.env.PORT ?? 3000;

export const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS?.split(",") ?? ["http://localhost:3000"];

export const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

export const SUPER_ADMIN_ID = process.env.SUPER_ADMIN_ID ?? "";

// Database
export const DB_HOST = process.env.DB_HOST ?? "localhost";
export const DB_NAME = process.env.DB_NAME ?? "usat";
export const DB_USERNAME = process.env.DB_USERNAME ?? "root";
export const DB_PASSWORD = process.env.DB_PASSWORD ?? "";

// GEOCODE
export const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY ?? "";

// AWS
export const AWS_CONNECT_INSTANCE_ID = process.env.AWS_CONNECT_INSTANCE_ID ?? "";
export const AWS_CONNECT_ACCESS_KEY_ID = process.env.AWS_CONNECT_ACCESS_KEY_ID ?? "";
export const AWS_CONNECT_SECRET_ACCESS_KEY = process.env.AWS_CONNECT_SECRET_ACCESS_KEY ?? "";
export const AWS_CONNECT_REGION = process.env.AWS_CONNECT_REGION ?? "us-east-1";