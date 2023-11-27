import express, { Application } from "express";
import cors from "cors";
import { ACCEPTED_ORIGINS } from "../globals";
import userRouter from "./application/user/user.routes";
import roleRouter from "./application/role/role.routes";
import componentRouter from "./application/component/component.routes";
import pageRouter from "./application/page/page.routes";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/api", userRouter);
app.use("/api", roleRouter);
app.use("/api", componentRouter);
app.use("/api", pageRouter);
app.use("/", (_req, res) => {
    res.status(200).json({message: "Welcome to the API"})
});