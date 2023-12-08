import express, { Application } from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import { ACCEPTED_ORIGINS } from "../globals";
import appRouter from "./app.routes";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.static('uploads'));
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (ACCEPTED_ORIGINS.includes(origin)) {
            callback(null, true)
            return;
        };
        return callback(new Error('Not allowed by CORS'));
    }
}));
app.disable('x-powered-by');

app.use("/", appRouter);